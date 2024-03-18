import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";

function formatTimestamp(timestamp) {
  const now = Date.now();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    return postDate.toLocaleDateString();
  }
}

export const Post = ({ post }) => {
  return (
    <div className="border flex flex-col max-w-[400px] lg:max-w-[600px] bumpup p-8">
      <div className="w-full flex justify-between">
        <div className="pb-2 font-semibold">{post.user.username}</div>
        <div className="pb-2 text-gray-400">{formatTimestamp(post.createdAt)}</div>
      </div>
      <Image src={post.imageUrl} alt={post.id} width={880} height={880} />
      <p className="p-2">{post.content}</p>
      <div className="flex justify-between mt-2">
        <button className="flex justify-center items-center">
          <BiLike className="mx-2 hover:scale-110" />
          {`${post.likes}`}
        </button>
        <button className="flex justify-center items-center">
          <FaRegComment className="mx-2 hover:scale-110" />
          {`${post.comments}`}
        </button>
      </div>
    </div>
  );
};