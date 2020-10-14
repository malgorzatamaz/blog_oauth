// import React, { useState } from "react"
// import auth0 from "auth0-js"

// // import { AUTH_CONFIG } from "../auth-variables"

// const auth = new auth0.WebAuth({
//   domain: AUTH_CONFIG.domain,
//   clientID: AUTH_CONFIG.clientId,
//   redirectUri: AUTH_CONFIG.callbackUrl,
//   audience: `https://${AUTH_CONFIG.domain}/userinfo`,
//   responseType: "token id_token"
// })

// const AuthContext = React.createContext({
//   user: undefined,
//   accessToken: "", // accessToken of user for Auth0
//   initiateLogin: () => {}, // to start the login process
//   handleAuthentication: () => {}, // handle Auth0 login process
//   logout: () => {} // logout the user
// })

// export const AuthProvider = props => {
//   const [user, setUser] = useState()
//   const [accessToken, setAccessToken] = useState()

//   const initiateLogin = () => {
//     auth.authorize()
//   }

//   const logout = () => {
//     auth.logout()
//     setUser(undefined)
//     setAccessToken("")
//   }

//   const handleAuthentication = () => {
//     auth.parseHash((error, authResult) => {
//       if (error) {
//         console.log(error)
//         console.log(`Error ${error.error} occured`)
//         return
//       }

//       console.log(authResult)

//       setSession(authResult.idTokenPayload)
//     })
//   }

//   const setSession = data => {
//     const newUser = {
//       email: data.email,
//       role: data[AUTH_CONFIG.roleUrl]
//     }
//     setUser(newUser)
//     setAccessToken(data.accessToken)
//   }

//   const authProviderValue = {
//     user,
//     initiateLogin,
//     handleAuthentication,
//     logout
//   }

//   return (
//     <AuthContext.Provider value={authProviderValue}>
//       {props.children}
//     </AuthContext.Provider>
//   )
// }

// export const AuthConsumer = AuthContext.Consumer

// export default AuthContext
