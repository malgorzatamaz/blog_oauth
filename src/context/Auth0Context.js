// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react"
import createAuth0Client from "@auth0/auth0-spa-js"
import config from "../auth-config.json"

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const AuthContext = React.createContext()
export const useAuth0 = () => useContext(AuthContext)
export const AuthProvider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  const saveUser = user => {
    const newUser = { ...user }
    newUser.role = user[config.roleUrl]
    setUser(newUser)
  }

  useEffect(() => {
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const initAuth0 = async () => {
    const auth0FromHook = await createAuth0Client(initOptions)
    setAuth0(auth0FromHook)

    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      const { appState } = await auth0FromHook.handleRedirectCallback()
      onRedirectCallback(appState)
    }

    const isAuthenticated = await auth0FromHook.isAuthenticated()

    setIsAuthenticated(isAuthenticated)

    if (isAuthenticated) {
      const user = await auth0FromHook.getUser()
      saveUser(user)
    }

    setLoading(false)
  }

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    saveUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    saveUser(user)
    console.log(user)
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
