import React, { useState, useEffect } from "react";
import { FiSend, FiUser, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const CommentSection = ({ blogDetails }) => {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/comment/getCommentsByBlogId?blog=${blogDetails._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setComments(data.comments);
        } else {
          setError(data.message || "Failed to fetch comments");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [blogDetails._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!newComment.trim()) {
      setError("Please write a comment");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/comment/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Anonymous",
          comment: newComment,
          blog: blogDetails._id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setComments([data.newComment, ...comments]); // ✅ Fix applied here
        setNewComment("");
        setName("");
        setError(null);
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto md:px-4 px-6 py-12">
      <div className="border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          <span className="text-amber-500">•</span> Reader Comments (
          {comments.length})
        </h3>

        <motion.div
          className="bg-gray-50 p-6 rounded-lg mb-12 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Leave a Comment
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Comment
              </label>
              <textarea
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Share your thoughts..."
                required
              ></textarea>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-600 text-white px-6 py-2 rounded-md flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" />
                  Post Comment
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {comments.slice(0, visibleComments).map((comment) => (
                <motion.div
                  key={comment._id}
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900">
                          {comment.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {visibleComments < comments.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMoreComments}
                  className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
                >
                  Show More <FiChevronDown className="ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
