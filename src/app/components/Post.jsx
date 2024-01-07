import React from 'react'

export const Post = ({post}) => {
  return (
    <div className="border p-2">
        <img src={post.image} alt={`Post ${post.id}`} />
        <div className="flex justify-between mt-2">
        <button>{`Like (${post.likes})`}</button>
        <button>{`Comment (${post.comments})`}</button>
        </div>
    </div>
  )
}
