'use client'
import { useState } from 'react';
import { MdOutlineSend, MdOutlineScheduleSend, MdOutlineCancelScheduleSend } from "react-icons/md";
import { addComment, deleteComment } from '@/app/actions';
import  Comment  from '@/app/components/Comment';

const CommentModal = ({ isOpen, onClose, post, session }) => {
    if (!isOpen) return null;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments || []);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const handlePostComment = async () => {
        setLoading(true);
        const newComment = {
            content: comment,
            createdAt: new Date(),
            likes: 0,
            userId: session?.user?.id,
        };

        setComments((prevComments) => [...prevComments, newComment]);

        const result = await addComment(session, post, comment);

        if (result.success) {
            setComment('');
        } else {
            setComments((prevComments) => prevComments.filter((c) => c !== newComment));
            console.error(result.failure);
        }
        setLoading(false);
    };

    const handleDeleteComment = async (comment) => {
        setComments((prevComments) => prevComments.filter((c) => c !== comment));

        const result = await deleteComment(session, comment);

        if (result.failure) {
            setComments((prevComments) => [comment, ...prevComments]);
            console.error(result.failure);
        }
    };

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-content border rounded-xl bg-slate-600 bumpup p-8" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="flex max-w-full h-1/3">
                        <div className="bg-black px-4 p-6 w-full h-full" style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
                            <div className="flex w-full h-full justify-between">
                                <div className='flex flex-col justify-between bg-transparent text-white resize-none border border-gray-300 rounded-lg p-2 w-[90%]'>
                                    <textarea
                                        className="bg-transparent text-white resize-none w-full outline-none h-32"
                                        placeholder="Add a comment..."
                                        maxLength="200"
                                        value={comment}
                                        onChange={handleInputChange}
                                    />
                                    <div className='flex justify-end'>
                                        <div className="text-sm text-gray-500">{comment.length}/200</div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <button className="flex justify-center items-center text-white" onClick={handlePostComment}>
                                        {loading ? <MdOutlineScheduleSend size={30} /> : (comment.length > 0 ? <MdOutlineSend size={30} /> : <MdOutlineCancelScheduleSend size={30} />)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-2/3 mx-4 overflow-y-auto overflow-x-hidden space-y-2 pt-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {comments.map((comment, index) => (
                            <Comment key={index} comment={comment} session={session} onDeleteComment={handleDeleteComment} />
                        )).reverse()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
