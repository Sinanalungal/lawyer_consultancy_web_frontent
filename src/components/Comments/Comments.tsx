// CommentSection.tsx
import React, { useState, useEffect } from 'react';
import { getBlogComments, postBlogComment } from '../../services/Blogs';
import { RootState, useAppSelector } from '../../redux/store';

interface User {
  profile_image_url?: string | null;
  profile_image?: string | null;
  full_name: string;
  role: string;
}

interface Comment {
  id: number;
  user: User;
  blog: number;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  id: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    fetchComments(page);
  }, [id, page]);

  const fetchComments = async (page: number) => {
    try {
      const response = await getBlogComments(id, page);
      setComments(response.results);
      setNext(response.next);
      setPrevious(response.previous);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        await postBlogComment(id, newComment);
        setNewComment('');
        fetchComments(page); 
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const handleNextPage = () => {
    if (next) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previous) {
      setPage(page - 1);
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
            userDetails={userDetail}
          />
          <div className="w-full flex-col justify-start items-start gap-2 flex">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
          <div className="w-full flex justify-between mt-4">
            {previous && (
              <button
                onClick={handlePreviousPage}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] text-white text-xs font-semibold leading-relaxed"
              >
                Previous
              </button>
            )}
            {next && (
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] text-white text-xs font-semibold leading-relaxed"
              >
                Next
              </button>
            )}
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
  userDetails: User;
}> = ({ newComment, setNewComment, handleCommentSubmit, userDetails }) => (
  <form className="w-full flex-col justify-start items-start gap-5 flex" onSubmit={handleCommentSubmit}>
    <div className="w-full rounded-3xl justify-start items-start gap-3.5 inline-flex">
      <img className="w-10 h-10 rounded-full" src={userDetails.profile_image ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} alt={userDetails.full_name} />
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

  useEffect(() => {
    const textElement = document.getElementById(`comment-text-${comment.id}`);
    if (textElement) {
      setIsTruncated(textElement.scrollHeight > textElement.clientHeight);
    }
  }, [isExpanded, comment.content]);

  return (
    <div className="w-full pb-6 border p-3 overflow- rounded-2xl border-gray-300 justify-start items-start gap-2.5 inline-flex">
      <img className="w-10 h-10 rounded-full" src={comment.user.profile_image_url ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} alt={`${comment.user.full_name} image`} />
      <div className="w-full flex-col justify-start items-start gap-3.5 inline-flex">
        <div className="w-full justify-start items-start flex-col flex gap-1">
          <div className="w-full justify-between items-start gap-1 inline-flex">
            <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.full_name}</h5>
            <span className="text-right text-gray-500 text-[10px] font-normal leading-5">{new Date(comment.created_at).toLocaleString()}</span>
          </div>
          <div className=''>
            <p
              id={`comment-text-${comment.id}`}
              className={`text-gray-800 text-xs font-normal leading-snug ${isExpanded ? '' : 'line-clamp-1'}`}
            >
              {comment.content}
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
