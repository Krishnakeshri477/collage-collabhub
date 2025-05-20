import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const MessageFeature = ({ postId, comments, commentsCount, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(postId, commentText);
      setCommentText('');
    }
  };

  const toggleMessageBox = () => {
    setIsMessageBoxVisible(!isMessageBoxVisible);
  };

  return (
    <div className="relative">
      {/* Message icon with better positioning */}
      <div className="flex items-center">
        <button 
          className="flex items-center space-x-1 hover:text-blue-400 transition-colors p-1"
          onClick={toggleMessageBox}
          aria-label="Toggle comments"
        >
          <FiMessageSquare size={20} className="flex-shrink-0" />
          {commentsCount > 0 && (
            <span className="text-sm min-w-[1rem] text-center">{commentsCount}</span>
          )}
        </button>
      </div>

      {/* Message box - shown when isMessageBoxVisible is true */}
      {isMessageBoxVisible && (
        <div className="absolute right-0 md:left-0 top-full mt-2 w-72 bg-gray-800 rounded-lg shadow-lg p-3 z-10">
          {/* Comments list */}
          {comments.length > 0 ? (
            <div className="space-y-2 mb-3 max-h-60 overflow-y-auto pr-2">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-700 p-2 rounded-lg">
                  <p className="text-white text-sm">{comment.text}</p>
                  <p className="text-gray-400 text-xs">@{comment.username} • {comment.timestamp}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm mb-3 text-center py-2">
              No comments yet
            </div>
          )}

          {/* Comment input form */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <button 
              type="submit"
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              disabled={!commentText.trim()}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MessageFeature;
