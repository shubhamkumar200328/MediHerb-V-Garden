import React, { useState, useEffect } from "react"
import axios from "axios"

const Forum = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: "", content: "" })

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5010/forum/posts")
      setPosts(response.data)
    }
    fetchPosts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const response = await axios.post(
      "http://localhost:5010/forum/posts",
      newPost,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    setPosts([...posts, response.data])
    setNewPost({ title: "", content: "" })
  }

  return (
    <div>
      <h1>Forum</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By: {post.author.username}</p>
            <div>
              {post.comments.map((comment) => (
                <div key={comment._id}>
                  <p>{comment.content}</p>
                  <p>By: {comment.author.username}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forum
