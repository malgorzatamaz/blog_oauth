import React, { Fragment } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { get } from "lodash"

import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { PostsList } from "./components/PostsList"
import { User } from "./components/User"
import { NewPost } from "./components/NewPost"
import { useAuth0 } from "./context/Auth0Context"
import history from "../src/utils/history"
import Can, { check } from "./components/Auth/Can"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const { loading, user } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route component={Dashboard} path="/" exact />

        <Route component={NewPost} path="/post-new" />
        <Route component={PostsList} path="/posts" />
        <Route component={User} path="/user" />
        {/* <ProtectedRoute access="posts:create">
          <Route component={NewPost} path="/post-new" />
        </ProtectedRoute>
        <ProtectedRoute access="posts:list">
          <Route component={PostsList} path="/posts" />
        </ProtectedRoute>
        <ProtectedRoute access="user:getSelf">
          <Route component={User} path="/user" />
        </ProtectedRoute> */}
      </Switch>
    </Router>
  )
}

const ProtectedRoute = props => {
  const { user } = useAuth0()
  const role = get(user, "role") || "visitor"
  const can = check(role, props.access)
  console.log(can)
  if (!can) return <Redirect to="/"></Redirect>

  return props.children
}

export default App
