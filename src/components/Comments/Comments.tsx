// CommentSection.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Comment {
  id: number;
  name: string;
  text: string;
  avatar: string;
  time: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: 'Mia Thompson',
      text: 'In vestibulum sed aliquet id turpis. Sagittis sed sed adipiscing velit habitant quam. Neque feugiat consectetur consectetur turpis.',
      avatar: 'https://pagedone.io/asset/uploads/1710226776.png',
      time: '12 hours ago',
    },
    {
      id: 2,
      name: 'Emma Davis',
      text: 'Rutrum enim commodo est tristique vitae ut porta euismod cras. Id quis at donec duis scelerisque. Diam magnis adipiscing tellus sapien diam neque porta nullam lectus. Velit ornare odio ornare congue eleifend turpis nulla diam. Pharetra pellentesque ultrices sollicitudin phasellus suspendisse.',
      avatar: 'https://pagedone.io/asset/uploads/1710238051.png',
      time: '2 days ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: comments.length + 1,
        name: 'John Smith', // You can replace this with dynamic data
        text: newComment,
        avatar: 'https://pagedone.io/asset/uploads/1710225753.png',
        time: 'Just now',
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  return (
    <section className="py-24 max-sm:py-10 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-14 gap-7 inline-flex">
          <h2 className="w-full text-gray-900 text-xl sm:text-2xl font-bold font-manrope leading-normal">Comments</h2>
          <CommentForm 
            newComment={newComment} 
            setNewComment={setNewComment} 
            handleCommentSubmit={handleCommentSubmit} 
          />
          <div className="w-full flex-col justify-start items-start gap-2 flex">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CommentForm: React.FC<{
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: (e: React.FormEvent) => void;
}> = ({ newComment, setNewComment, handleCommentSubmit }) => (
  <form className="w-full flex-col justify-start items-start gap-5 flex" onSubmit={handleCommentSubmit}>
    <div className="w-full rounded-3xl justify-start items-start gap-3.5 inline-flex">
      <img className="w-10 h-10" src="https://pagedone.io/asset/uploads/1710225753.png" alt="John Smith" />
      <textarea
        name=""
        rows={5}
        className="w-full px-5 text-xs py-3 rounded-2xl border border-gray-300 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] resize-none focus:outline-none placeholder-gray-400 text-gray-900 font-normal leading-7"
        placeholder="Write your thoughts here...."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
    </div>
    <div className='w-full flex justify-end h-full'>
    <button
      type="submit"
      className="px-2  py-2.5 bg-slate-900 hover:bg-slate-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
    >
      <span className="px-2 py-px text-white text-xs font-semibold leading-relaxed">Post your comment</span>
    </button>
    </div>
  </form>
);

const Comment: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [isExpanded]);

  return (
    <div className="w-full pb-6 border p-3 overflow- rounded-2xl border-gray-300 justify-start items-start gap-2.5 inline-flex">
      <img className="w-10 h-10 rounded-full" src={comment.avatar} alt={`${comment.name} image`} />
      <div className="w-full flex-col justify-start items-start gap-3.5 inline-flex">
        <div className="w-full justify-start items-start flex-col flex gap-1">
          <div className="w-full justify-between items-start gap-1 inline-flex">
            <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.name}</h5>
            <span className="text-right text-gray-500 text-[10px] font-normal leading-5">{comment.time}</span>
          </div>
          <div className=''>
            <p
              ref={textRef}
              className={`text-gray-800 text-xs font-normal leading-snug ${isExpanded ? '' : 'line-clamp-1'}`}
            >
              {comment.text}
            </p>
            {isTruncated && (
              <button
                className="text-blue-500  text-[11px] mt-1"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
