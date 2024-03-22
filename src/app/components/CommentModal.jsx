'use client'
import { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { MdOutlineSend } from "react-icons/md";
import { MdOutlineScheduleSend } from "react-icons/md";
import { MdOutlineCancelScheduleSend } from "react-icons/md";



const CommentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [comment, setComment] = useState('');
    const comments = Array(20).fill({ text: 'Fake commentasdfasdfasdfasdfasdfasasdfasdfdfasdfasdfasdfasdf', likes: 0 });

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

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
                                        <button className="flex justify-center items-center text-white">
                                            {comment.length > 0 ? <MdOutlineSend size={30} /> : <MdOutlineCancelScheduleSend size={30} />}
                                        </button>
                                    </div>
                                    
                               </div>
                                    
                                    
                            </div>
                        </div>
                        <div className="w-full h-2/3 mx-4 overflow-y-auto overflow-x-hidden space-y-2 pt-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {comments.map((comment, index) => (
                                    <div key={index} className="flex flex-col justify-between items-center border-b-2 px-2 py-1 w-[400px] border rounded-lg border-gray-500">
                                        <div className='flex w-full justify-end'>
                                            <button className='text-xs'>X</button>
                                        </div>
                                        <div>
                                            <p className='max-w-[380px]' style={{ wordWrap: 'break-word' }}>{comment.text}</p>
                                        </div>
                                        <div className='flex w-full justify-between items-center'>
                                            <button className="flex mt-3 justify-center items-center">
                                                <BiLike />
                                                 {comment.likes}</button>
                                            <p className="text-gray-400 text-xs">Posted at</p>
                                        </div>
                                        
                                        
                                        
                                    </div>
                                )).reverse()}
                        </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;