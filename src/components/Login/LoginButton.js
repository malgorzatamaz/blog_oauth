import React from "react"

import { useAuth0 } from "../../context/Auth0Context"

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <a className="nav-link" onClick={() => loginWithRedirect({})}>
          Log in
        </a>
      )}

      {isAuthenticated && (
        <a className="nav-link" onClick={() => logout()}>
          Log out
        </a>
      )}
    </div>
  )
}

export default LoginButton
