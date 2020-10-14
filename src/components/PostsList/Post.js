import React, { Fragment } from "react"
import moment from "moment"
import Can from "../Auth/Can"
import { useAuth0 } from "../../context/Auth0Context"
import { get } from "lodash"

import "./Post.sass"

const Post = ({ post }) => {
  const { user } = useAuth0()

  return (
    <div className="post card" key={post.url}>
      <img className="post__image" src="http://placekitten.com/200/200"></img>
      <div className="post__content">
        <div className="post__title">{post.name}</div>
        <div>
          Created {moment(post.publish_date).format("LLLL")}
          {post.author && (
            <Fragment>
              by {post.author.full_name}, {post.author.email}
            </Fragment>
          )}
        </div>
        <Can
          perform="posts:edit"
          data={{
            userId: get(user, "email"),
            postOwnerId: get(post, "author.email")
          }}
          yes={() => <a>Edit</a>}
        />
        <Can
          perform="posts:delete"
          data={{
            userId: get(user, "email"),
            postOwnerId: get(post, "author.email")
          }}
          yes={() => <a>Delete</a>}
        />
      </div>
    </div>
  )
}

export default Post
