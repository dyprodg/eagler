'use client'
import { useState, useEffect } from 'react';
import { BiLike } from 'react-icons/bi';
import { TiDeleteOutline } from "react-icons/ti";
import { timeAgo } from './timeago';
import { setCommentLike } from '@/app/actions';

const Comment = ({ comment, session, onDeleteComment }) => {
    const [likes, setLikes] = useState([]);
    const [myLike, setMyLike] = useState(false);

    useEffect(() => {
        if (comment.CommentLike) {
            setLikes(comment.CommentLike);
            setMyLike(comment.CommentLike.some(like => like.userId === session?.user?.id));
        }
    }, [comment]);

    const handleLike = async () => {
        try {
            const response = await setCommentLike(session, comment);
            if (response.success) {
                if (response.success === "Like added") {
                    setLikes(prevLikes => [...prevLikes, { userId: session.user.id }]);
                } else if (response.success === "Like removed") {
                    setLikes(prevLikes => prevLikes.filter(like => like.userId !== session.user.id));
                }
                setMyLike(!myLike);
            } else if (response.failure) {
                console.log(response.failure);
            }
        } catch (error) {
            console.log("Error setting like:", error);
        }
    };

    const handleDelete = () => {
        onDeleteComment(comment);
    };

    return (
        <div className="flex flex-col justify-between items-start border-b-2 px-2 py-1 w-[400px] border rounded-lg border-gray-500">
            <div className='flex w-full justify-end'>
                {session?.user?.id === comment?.userId && 
                    <button className='text-xs hover:text-red-600' onClick={handleDelete}>
                        <TiDeleteOutline size={20}/>
                    </button>}
            </div>
            <div className='justify-start'>
                <p className='max-w-[380px] text-left' style={{ wordWrap: 'break-word' }}>{comment.content}</p>
            </div>
            <div className='flex w-full justify-between items-center'>
                <button 
                    className={`flex mt-3 justify-center items-center ${myLike ? 'text-blue-600' : ''}`}
                    onClick={handleLike}>
                    <BiLike />
                    {`${likes.length}`}
                </button>
                <p className="text-gray-400 text-xs">{timeAgo(new Date(comment.createdAt))}</p>
            </div>
        </div>
    );
};

export default Comment;
