import React from "react"

import { useAuth0 } from "../../context/Auth0Context"

const User = () => {
  const { user } = useAuth0()
  return (
    <h2>
      User Profile
      <ul>
        <li>ID: {user.id}</li>
        <li>Email: {user.email}</li>
        <li>Role: {user.role}</li>
      </ul>
    </h2>
  )
}

export default User
