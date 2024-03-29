'use client'
import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";
import { setLike } from "@/app/actions";
import { useState, useEffect } from "react";
import CommentModal from "./CommentModal";
import SpinnerLoader from "./loaders/SpinnerLoader";

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



export const Post = ({ post, session }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [myLike, setMyLike] = useState(post.likes.some(like => like.userId === session?.user?.id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(post.imageUrl);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const image = new window.Image();
    image.src = `${post.imageUrl}?retry=${retryCount}`;
    image.onload = () => {
      setIsImageLoading(false);
      setImageError(false);
    };
    image.onerror = () => {
      setIsImageLoading(true);
      setImageError(true);
    };
  }, [post.imageUrl, retryCount]);
  
  useEffect(() => {
    if (imageError) {
      const timer = setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, 500); 
  
      return () => clearTimeout(timer); 
    }
  }, [imageError, retryCount]);


  const handleSetLike = async (postId) => { 
    setLikes(likes => myLike ? likes - 1 : likes + 1);
    setMyLike(!myLike);

    try {
      const response = await setLike(session, { id: postId });
      if (response.success) {
      } else if (response.failure) {
        console.log(response.failure);
        setLikes(likes => myLike ? likes + 1 : likes - 1);
        setMyLike(!myLike);
      }
    } catch (error) {
      console.log("Error setting like:", error);
      setLikes(likes => myLike ? likes + 1 : likes - 1);
      setMyLike(!myLike);
    }
  }

  return (
    <div className="border flex flex-col max-w-[400px] lg:max-w-[600px] bumpup p-8">
      <div className="w-full flex justify-between">
        <div className="pb-2 font-semibold">{post.user.username}</div>
        <div className="pb-2 text-gray-400">{formatTimestamp(post.createdAt)}</div>
      </div>
      {imageError ? <SpinnerLoader /> : <img src={imageSrc} alt="Post" />}
      <p className="p-2">{post.content}</p>
      <div className="flex justify-between mt-2">
        <button 
          onClick={() => handleSetLike(post.id)}
          className={`flex justify-center items-center ${myLike ? 'text-blue-600' : ''}`}>
          <BiLike className="mx-2 hover:scale-110" />
          {`${likes}`}
        </button>
        <button className="flex justify-center items-center" onClick={() => setIsModalOpen(true)}>
          <FaRegComment className="mx-2 hover:scale-110" />
          {`${post.comments.length}`}
        </button>
        <CommentModal session={session} post={post} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};