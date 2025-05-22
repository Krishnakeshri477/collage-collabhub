import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import { FiHeart, FiShare2, FiBookmark, FiUserPlus, FiUserCheck, FiPlus } from 'react-icons/fi';
import MessageFeature from '../components/Feature/MessageFeature';
import CreatePostModal from '../components/Feature/CreatePostModal';
import ShareModal from '../components/Feature/ShareModal';

const Home = () => {
  // Sample users data
  const users = [
    { id: 1, name: 'Alex Johnson', username: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Computer Science' },
    { id: 2, name: 'Sarah Williams', username: 'sarah_data', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Data Science' },
    { id: 3, name: 'Michael Chen', username: 'michael_c', avatar: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Electrical Engineering' },
    { id: 4, name: 'Emma Wilson', username: 'emma_design', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Graphic Design' },
  ];

  // Sample college collaboration posts with connection status and comments
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'cs_student',
      userImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Computer Science',
      title: 'Looking for Team Members for Hackathon',
      description: 'Our team is working on an AI-based campus assistant for the upcoming hackathon. Need 2 more developers (frontend and ML). DM if interested! #hackathon #ai #teamup',
      media: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
      skills: ['React', 'Python', 'TensorFlow'],
      likes: 15,
      commentsCount: 8,
      comments: [
        { id: 1, text: 'Interested in the frontend position! What tech stack are you using?', username: 'frontend_dev', timestamp: '1 hour ago' },
        { id: 2, text: 'I have experience with TensorFlow. When is the hackathon?', username: 'ml_enthusiast', timestamp: '45 minutes ago' }
      ],
      timestamp: '2 hours ago',
      isLiked: false,
      isBookmarked: false,
      isConnected: false
    },
    {
      id: 2,
      username: 'physics_researcher',
      userImage: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Physics',
      title: 'Study Group for Quantum Mechanics',
      description: 'Forming a study group for PHYS 402 - Quantum Mechanics. Weekly meetings in the library. All levels welcome! #studygroup #physics #quantum',
      media: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
      skills: ['Quantum Physics', 'Mathematics'],
      likes: 23,
      commentsCount: 12,
      comments: [
        { id: 1, text: 'I could use some help with the homework problems!', username: 'quantum_newbie', timestamp: '3 hours ago' },
        { id: 2, text: 'What days are you planning to meet?', username: 'astro_student', timestamp: '2 hours ago' },
        { id: 3, text: 'I can help tutor if needed, I took this class last semester', username: 'physics_major', timestamp: '1 hour ago' }
      ],
      timestamp: '5 hours ago',
      isLiked: true,
      isBookmarked: false,
      isConnected: true
    }
  ]);

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Handle like action
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Handle bookmark action
  const handleBookmark = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  // Handle connect action
  const handleConnect = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isConnected: !post.isConnected
        };
      }
      return post;
    }));
  };

  // Handle share button click
  const handleShareClick = (postId) => {
    setCurrentPostId(postId);
    setIsShareModalOpen(true);
  };

  // Toggle user selection for sharing
  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  // Handle share submission
  const handleShareSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log(`Shared post ${currentPostId} with users:`, selectedUsers);
    console.log('Message:', message);
    
    // Show confirmation
    alert(`Post shared with ${selectedUsers.length} user(s)!`);
    
    // Reset and close modal
    setSelectedUsers([]);
    setMessage('');
    setIsShareModalOpen(false);
  };

  // Handle comment submission
  const handleCommentSubmit = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          text: commentText,
          username: 'current_user',
          timestamp: 'Just now'
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
          commentsCount: post.commentsCount + 1
        };
      }
      return post;
    }));
  };

  // Handle new post submission
  const handleNewPostSubmit = (postData) => {
    const newPostObj = {
      id: posts.length + 1,
      username: 'current_user',
      userImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Your Major',
      title: postData.title,
      description: postData.description,
      media: postData.media,
      skills: postData.skills,
      likes: 0,
      commentsCount: 0,
      comments: [],
      timestamp: 'Just now',
      isLiked: false,
      isBookmarked: false,
      isConnected: false
    };

    setPosts([newPostObj, ...posts]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
        {/* Header with Add Post button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Campus Feed</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus size={20} />
            <span>Create Post</span>
          </button>
        </div>

        {/* Posts Feed */}
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-700">
            {/* Post header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.userImage} 
                  alt={post.username} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                />
                <div>
                  <h3 className="font-semibold text-white">{post.username}</h3>
                  <p className="text-xs text-gray-400">{post.userMajor} • {post.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleConnect(post.id)}
                  className={`p-2 rounded-full ${post.isConnected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-colors`}
                >
                  {post.isConnected ? <FiUserCheck size={18} /> : <FiUserPlus size={18} />}
                </button>
              </div>
            </div>
            
            {/* Post title and description */}
            <div className="px-4 pb-3">
              <h2 className="text-lg font-bold text-white mb-1">{post.title}</h2>
              <p className="text-gray-300 text-sm">
                {post.description}
              </p>
            </div>

            {/* Skills required */}
            {post.skills && post.skills.length > 0 && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {post.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-700 text-blue-400 rounded-full text-xs font-medium border border-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Post media (optional) */}
            {post.media && (
              <div className="w-full border-t border-b border-gray-700">
                <img 
                  src={post.media} 
                  alt="Post content" 
                  className="w-full h-auto max-h-[500px] object-cover bg-gray-700"
                />
              </div>
            )}

            {/* Post actions */}
            <div className="flex p-4 justify-between text-gray-400">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-1 hover:text-red-400 transition-colors"
              >
                <FiHeart 
                  size={20} 
                  className={post.isLiked ? 'fill-current text-red-500' : ''} 
                />
                <span className={`text-sm ${post.isLiked ? 'text-red-400' : 'text-gray-400'}`}>
                  {post.likes}
                </span>
              </button>
              
              <MessageFeature
                postId={post.id}
                comments={post.comments}
                commentsCount={post.commentsCount}
                onCommentSubmit={handleCommentSubmit}
              />
              
              <button 
                onClick={() => handleShareClick(post.id)}
                className="flex items-center space-x-1 hover:text-green-400 transition-colors"
              >
                <FiShare2 size={20} />
              </button>
              
              <button 
                onClick={() => handleBookmark(post.id)}
                className="flex items-center space-x-1 hover:text-purple-400 transition-colors"
              >
                <FiBookmark 
                  size={20} 
                  className={post.isBookmarked ? 'fill-current text-purple-500' : ''} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Use the new CreatePostModal component */}
      <CreatePostModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPostSubmit}
      />

      {/* Use the new ShareModal component */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSelectedUsers([]);
          setMessage('');
        }}
        users={users}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedUsers={selectedUsers}
        toggleUserSelection={toggleUserSelection}
        message={message}
        setMessage={setMessage}
        onSubmit={handleShareSubmit}
      />
    </div>
  );
};

export default Home;
