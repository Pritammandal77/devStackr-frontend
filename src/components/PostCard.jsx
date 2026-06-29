import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Linkify from 'linkify-react';
import axiosInstance from '../utils/axiosInstance';
import { createComment, deleteComment, getCurrentPostComments } from '../utils/CommentAPIs';
import { FormatTime } from '../utils/FormatTime';

// Premium icons replacing legacy Font Awesome for visual unity
import { 
  ThumbsUp, 
  MessageSquare, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Send, 
  Heart,
  Loader2,
  Calendar,
  UserCheck
} from 'lucide-react';

// Import loader fallbacks
import Loader3 from './Loaders/Loader3';
import Loader2Component from './Loaders/Loader2';

/**
 * Premium PostCard Component for DevStackr
 * Offers fully responsive designs, smooth micro-interactions, clean layout structures,
 * and adaptive color modes aligned with light and dark systems.
 */
function PostCard({ 
  authorUserId, 
  authorName, 
  authorProfilePicture, 
  createdAt, 
  postDesc, 
  postImage, 
  postVideo, 
  postId, 
  likesCount, 
  followBtn, 
  isAlreadyLiked 
}) {
  const currentUserId = useSelector((state) => state.userData?.currentUserData?.data?._id);
  const mode = useSelector((state) => state.mode.mode);
  const navigate = useNavigate();

  // Control Visibility States
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [visibleCommentMenu, setVisibleCommentMenu] = useState(null);

  // Likes & Interactions States
  const [postLikesData, setPostLikesData] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Deletion Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Liking Core State
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);

  // Comment Core States
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isNewCommentAdded, setIsNewCommentAdded] = useState(false);

  const likeAPost = async (postId) => {
    if (!currentUserId) {
      toast.error("Please login to continue..");
      return;
    }
    setIsLiking(true);
    try {
      const response = await axiosInstance.put("/api/v1/posts/likes", { postId: postId });
      setPostLikesData(response.data.data);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to like the post", error);
      toast.error("Failed to update post reaction");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!currentUserId) {
      toast.error("Please login to continue..");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    setIsNewCommentAdded(true);
    setIsLoading(true);
    try {
      const payload = { postId, commentText };
      const response = await createComment(payload);
      if (response?.statusCode === 200) {
        toast.success("Comment added successfully");
      }
    } catch (error) {
      console.error("Error while creating comment", error);
    } finally {
      setIsNewCommentAdded(false);
      setCommentText("");
      setIsLoading(false);
    }
  };

  const handleGetCurrentPostComments = async (postId) => {
    try {
      const response = await getCurrentPostComments(postId);
      if (response?.data?.data) {
        setAllComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setIsLoading(true);
      const response = await deleteComment(commentId);
      if (response?.data?.statusCode === 200 || response?.status === 200) {
        toast.success("Comment deleted successfully");
        handleGetCurrentPostComments(postId);
      }
    } catch (error) {
      console.error("Error while deleting comment", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrentPostComments(postId);
  }, [isNewCommentAdded, postId]);

  const handleDeletePost = async (id) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.delete(`/api/v1/posts/deletepost/${id}`);
      if (res.data?.statusCode === 200) {
        toast.success("Post deleted successfully");
        // Safe UI reload or page redirections
        window.location.reload();
      }
    } catch (error) {
      console.error("Error while deleting post", error);
      toast.error("Could not delete post");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = () => {
    handleDeletePost(selectedPost);
    setShowDeleteModal(false);
  };

  return (
    <>
      {/* Post container with center-focused fluid grid and unified max-width limits */}
      <div className="w-full max-w-2xl mx-auto py-3">
        <div 
          className={`w-full rounded-2xl p-5 border transition-all duration-300 relative shadow-lg
            ${mode === 'light' 
              ? 'bg-white border-slate-200/80 text-slate-800 shadow-slate-100/60' 
              : 'bg-[#11141A]/70 backdrop-blur-md border-slate-800/60 text-slate-100 shadow-black/10'
            }`}
        >
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3.5">
              <div className="relative group">
                <img 
                  src={authorProfilePicture || "/defaultpfp.png"} 
                  alt={authorName}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-500/10 hover:ring-indigo-500/70 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/user/${authorUserId}`)}
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#11141A] shrink-0" />
              </div>
              
              <div className="flex flex-col">
                <h4 
                  onClick={() => navigate(`/user/${authorUserId}`)}
                  className="text-[15px] font-bold tracking-tight hover:text-indigo-500 cursor-pointer transition-colors"
                >
                  {authorName}
                </h4>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                  <Calendar className="h-3.5 w-3.5 opacity-60" />
                  {createdAt}
                </span>
              </div>
            </div>

            {/* Author Settings Actions Dropdown */}
            {currentUserId === authorUserId && (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuVisible(!isMenuVisible)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                {isMenuVisible && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuVisible(false)} />
                    <div className={`absolute right-0 top-8 w-44 rounded-xl border py-1.5 shadow-xl z-20 transition-all duration-250
                      ${mode === 'light' 
                        ? 'bg-white border-slate-200 text-slate-800' 
                        : 'bg-[#161a22] border-slate-800 text-slate-200'}`}
                    >
                      <button 
                        onClick={() => {
                          setIsMenuVisible(false);
                          navigate(`/editpost/${postId}`);
                        }}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold w-full text-left hover:bg-indigo-500 hover:text-white transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit Post</span>
                      </button>
                      <button 
                        onClick={() => {
                          setIsMenuVisible(false);
                          setSelectedPost(postId);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold w-full text-left text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Post</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Post Description Body */}
          <div className="mb-4">
            <p className="text-[14.5px] leading-relaxed whitespace-pre-line tracking-normal opacity-95">
              <Linkify
                options={{
                  target: "_blank",
                  className: "text-indigo-500 hover:underline font-semibold"
                }}
              >
                {postDesc}
              </Linkify>
            </p>
          </div>

          {/* Media Attachments Block */}
          {(postImage || postVideo) && (
            <div className="overflow-hidden rounded-xl border border-slate-200/10 mb-4 bg-slate-900/40">
              {postImage && (
                <img 
                  src={postImage} 
                  alt="Post attachment" 
                  className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-500" 
                />
              )}
              {postVideo && (
                <video
                  src={postVideo}
                  className="w-full max-h-[450px] bg-black"
                  controls
                  autoPlay={false}
                  muted
                  playsInline
                />
              )}
            </div>
          )}

          {/* Post Interaction Section Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100/10 dark:border-slate-800/40">
            <button 
              onClick={() => likeAPost(postId)}
              disabled={isLiking}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-bold transition-all
                ${isLiked 
                  ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20 shadow-sm' 
                  : mode === 'light'
                    ? 'hover:bg-slate-100 text-slate-500'
                    : 'hover:bg-slate-800/50 text-slate-400'}`}
            >
              {isLiking ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin text-indigo-500" />
              ) : (
                <ThumbsUp className={`h-4.5 w-4.5 transition-transform ${isLiked ? 'scale-110 fill-indigo-500' : ''}`} />
              )}
              <span>{postLikesData ? postLikesData.likesCount : likesCount.length} Likes</span>
            </button>

            <button 
              onClick={() => setIsCommentSectionVisible(!isCommentSectionVisible)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-bold transition-all
                ${isCommentSectionVisible 
                  ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20' 
                  : mode === 'light'
                    ? 'hover:bg-slate-100 text-slate-500'
                    : 'hover:bg-slate-800/50 text-slate-400'}`}
            >
              <MessageSquare className="h-4.5 w-4.5" />
              <span>{allComments.length > 0 ? allComments.length : "0"} Comments</span>
            </button>
          </div>

          {/* Active Comment Section */}
          {isCommentSectionVisible && (
            <div className="mt-5 pt-4 border-t border-slate-100/10 dark:border-slate-800/40 animate-fadeIn">
              {/* Write Comment Interface */}
              <div className={`p-3.5 rounded-xl border flex flex-col gap-3 mb-5 transition-all
                ${mode === 'light' 
                  ? 'bg-slate-50/50 border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100' 
                  : 'bg-[#161a22]/40 border-slate-800 focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-950/20'}`}>
                
                <textarea 
                  placeholder="Share your thoughts..."
                  required
                  maxLength={400}
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  className="w-full min-h-[42px] max-h-[160px] text-sm bg-transparent border-0 outline-none resize-none overflow-y-auto placeholder-slate-500 text-slate-200"
                />
                
                <div className="flex items-center justify-between border-t border-slate-800/20 pt-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {commentText.length}/400
                  </span>
                  <button 
                    onClick={() => handleComment(postId, commentText)}
                    disabled={!commentText.trim()}
                    className="h-8.5 px-4 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white flex items-center gap-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>

              {/* Comments Feed Render */}
              <div className="space-y-3">
                {allComments.length > 0 && (
                  <h5 className="text-[14px] font-extrabold tracking-tight mb-2 text-slate-400 uppercase">
                    Discussion
                  </h5>
                )}

                <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
                  {allComments.length > 0 ? (
                    allComments.map((data, index) => (
                      <div 
                        key={index} 
                        className={`relative flex gap-3 p-3.5 rounded-xl border transition-all hover:scale-[1.005]
                          ${mode === 'light' 
                            ? 'bg-slate-50/40 border-slate-100' 
                            : 'bg-[#161a22]/20 border-slate-800/40'}`}
                      >
                        {/* Comment User Avatar */}
                        <img 
                          src={data.user?.profilePicture || "/defaultpfp.png"} 
                          alt={data.user?.name} 
                          className="h-9 w-9 rounded-full object-cover hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                          onClick={() => navigate(`/user/${data.user?._id}`)}
                        />

                        {/* Comment Core Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span 
                                onClick={() => navigate(`/user/${data.user?._id}`)}
                                className="text-sm font-bold hover:text-indigo-400 cursor-pointer transition-colors"
                              >
                                {data.user?.name}
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">
                                • {FormatTime(data.createdAt)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-slate-500 font-bold mb-1">
                            @{data.user?.userName || "user"}
                          </p>
                          <p className="text-[13px] text-slate-300 leading-relaxed break-words">
                            {data.comment}
                          </p>
                        </div>

                        {/* Comment Admin Droplist Options */}
                        {currentUserId === data.user?._id && (
                          <div className="relative shrink-0">
                            <button 
                              onClick={() => setVisibleCommentMenu(visibleCommentMenu === data._id ? null : data._id)}
                              className="p-1 rounded-lg hover:bg-slate-800/60 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              <MoreVertical className="h-4.5 w-4.5" />
                            </button>

                            {visibleCommentMenu === data._id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setVisibleCommentMenu(null)} />
                                <div className={`absolute right-0 top-6 w-36 rounded-xl border shadow-xl z-20 overflow-hidden
                                  ${mode === 'light' 
                                    ? 'bg-white border-slate-200 text-slate-800' 
                                    : 'bg-[#1a1f29] border-slate-800 text-slate-200'}`}
                                >
                                  <button 
                                    onClick={() => {
                                      handleDeleteComment(data._id);
                                      setVisibleCommentMenu(null);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold w-full text-left text-rose-500 hover:bg-rose-500/10 transition-colors"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-sm text-slate-500 font-medium">No comments yet. Start the conversation!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Absolute Overlays Loaders */}
      {isLoading && <Loader2Component />}

      {/* Styled Premium Modal Box for Deletion Confirmations */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-md z-[100] p-4 transition-all duration-300">
          <div 
            className={`p-6 rounded-2xl w-full max-w-sm border shadow-2xl animate-[modal_0.25s_ease-out_forwards]
              ${mode === 'light' 
                ? 'bg-white border-slate-200 text-slate-800' 
                : 'bg-[#11141A] border-slate-800 text-slate-100'
              }`}
          >
            <h2 className="text-lg font-bold mb-2">
              Are you sure you want to delete this post?
            </h2>

            <p className="text-sm text-slate-400 mb-6 font-medium">
              This action is permanent and cannot be recovered under any circumstances.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`px-4.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer
                  ${mode === 'light' 
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                    : 'bg-[#1e293b]/60 text-slate-300 hover:bg-[#1e293b]'
                  }`}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4.5 py-2.5 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20 transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;


// props for commentCard, if I use the seperate component for it
// <CommentCard
//     key={index}
//     profilePicture={data.user.profilePicture}
//     userId={data.user._id}
//     name={data.user.name}
//     createdAt={data.createdAt}
//     userName={data.user.userName}
//     comment={data.comment}
//     commentId={data._id}
//     currentUserId={currentUserId}
//     setIsMenuVisible={setIsMenuVisible}
//     isMenuVisible={isMenuVisible}
//     handleDeleteComment={handleDeleteComment}
// />