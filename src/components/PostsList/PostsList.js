import React, { useEffect, useState } from "react"
import { get } from "lodash"
import Post from "./Post"

const PostsList = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const parsedPosts = data => {
    const posts = get(data, "objects") || []

    const parsedPosts = posts.map(post => {
      return {
        author: post.blog_author,
        url: post.url,
        date: post.publish_date,
        name: post.name,
        content: post.post_body
      }
    })
    return parsedPosts
  }

  const getData = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url =
      "https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo&limit=5" // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => setPosts(parsedPosts(data)))
  }

  return (
    <div>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  )
}

export default PostsList
