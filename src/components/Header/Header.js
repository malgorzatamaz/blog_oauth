/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import LoginButton from "../Login/LoginButton"
import Can from "../Auth/Can"
import { Link } from "react-router-dom"
import { get } from "lodash"
import { useAuth0 } from "../../context/Auth0Context"

const Header = () => {
  const { user } = useAuth0()
  const role = get(user, "role") || "visitor"

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="nav-link" to="/">
        Blog
      </Link>
      <ul className="navbar-nav">
        <Can
          perform="posts:list"
          role={role}
          yes={() => (
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>
          )}
        />
        <Can
          perform="posts:create"
          role={role}
          yes={() => (
            <li className="nav-item">
              <Link className="nav-link" to="/post-new">
                New post
              </Link>
            </li>
          )}
        />
        <li className="nav-item">
          <Can
            role={role}
            perform="user:getSelf"
            yes={() => (
              <Link className="nav-link" to="/user">
                {get(user, "email") || "email"}
              </Link>
            )}
          />
        </li>
        <li className="nav-item">
          <LoginButton />
        </li>
      </ul>
    </nav>
  )
}

export default Header
