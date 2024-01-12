import React from 'react'
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";


export const Post = ({post}) => {
  return (
    <div className="border p-2 flex flex-col">
        <div className='pb-2 font-semibold'>{post.user.username}</div>
        <p>{post.id}{post.content}</p>
        <img src={post.imageUrl} alt={`Post ${post.id}`} />
        <div className="flex justify-between mt-2">
        <button className='flex justify-center items-center'><BiLike className='mx-2 hover:scale-110'/>{`${post.likes}`}</button>
        <button className='flex justify-center items-center'><FaRegComment className='mx-2 hover:scale-110' />{`${post.comments}`}</button>
        </div>
    </div>
  )
}
