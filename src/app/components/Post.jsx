import React from 'react'
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Image from 'next/image';


export const Post = ({post}) => {
  return (
    <div className="border p-2 flex flex-col max-w-[400px]">
        <div className='pb-2 font-semibold'>{post.user.username}</div>
        <p>postid:{post.id}</p>
        <p>description:{post.content}</p>
        <Image src={post.imageUrl} alt={post.id} width={380} height={380}/>
        <div className="flex justify-between mt-2">
        <button className='flex justify-center items-center'><BiLike className='mx-2 hover:scale-110'/>{`${post.likes}`}</button>
        <button className='flex justify-center items-center'><FaRegComment className='mx-2 hover:scale-110' />{`${post.comments}`}</button>
        </div>
    </div>
  )
}
