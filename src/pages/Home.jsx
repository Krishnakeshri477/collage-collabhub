import React, { useState, useRef } from 'react';
import Navbar from '../components/Layout/Navbar';
import { FiMessageSquare, FiHeart, FiShare2, FiBookmark, FiMoreHorizontal, FiUserPlus, FiUserCheck, FiPlus, FiImage, FiX, FiSearch } from 'react-icons/fi';

const Home = () => {
  // Sample users data
  const users = [
    { id: 1, name: 'Alex Johnson', username: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Computer Science' },
    { id: 2, name: 'Sarah Williams', username: 'sarah_data', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Data Science' },
    { id: 3, name: 'Michael Chen', username: 'michael_c', avatar: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Electrical Engineering' },
    { id: 4, name: 'Emma Wilson', username: 'emma_design', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Graphic Design' },
  ];

  // Sample college collaboration posts with connection status
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
      comments: 8,
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
      comments: 12,
      timestamp: '5 hours ago',
      isLiked: true,
      isBookmarked: false,
      isConnected: true
    }
  ]);

  // State for new post modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    skills: '',
    media: null,
    mediaPreview: null
  });
  const fileInputRef = useRef(null);

  // State for share modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({
          ...newPost,
          media: file,
          mediaPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Handle new post input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mediaUrl = newPost.mediaPreview || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80';
    
    const newPostObj = {
      id: posts.length + 1,
      username: 'current_user',
      userImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Your Major',
      title: newPost.title,
      description: newPost.description,
      media: mediaUrl,
      skills: newPost.skills.split(',').map(skill => skill.trim()),
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false,
      isBookmarked: false,
      isConnected: false
    };

    setPosts([newPostObj, ...posts]);
    setNewPost({ 
      title: '', 
      description: '', 
      skills: '', 
      media: null,
      mediaPreview: null 
    });
    setIsModalOpen(false);
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
                <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                  <FiMoreHorizontal size={20} />
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
              
              <button 
                onClick={() => console.log(`Comment on post ${post.id}`)}
                className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
              >
                <FiMessageSquare size={20} />
                <span className="text-sm">{post.comments}</span>
              </button>
              
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

      {/* Add Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Create New Post</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={newPost.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Skills Needed (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={newPost.skills}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Python, Design"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition-colors"
                >
                  {newPost.mediaPreview ? (
                    <div className="relative">
                      <img 
                        src={newPost.mediaPreview} 
                        alt="Preview" 
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewPost({...newPost, media: null, mediaPreview: null});
                        }}
                        className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiImage size={40} className="mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-400">Click to upload an image</p>
                      <p className="text-xs text-gray-500">(optional)</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Share Post</h2>
              <button 
                onClick={() => {
                  setIsShareModalOpen(false);
                  setSelectedUsers([]);
                  setMessage('');
                }}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">Search Users</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or username"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4 max-h-60 overflow-y-auto">
              <h3 className="text-gray-300 text-sm font-medium mb-2">Select Users</h3>
              {filteredUsers.length > 0 ? (
                <ul className="space-y-2">
                  {filteredUsers.map(user => (
                    <li key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                        />
                        <div>
                          <p className="text-white text-sm">{user.name}</p>
                          <p className="text-gray-400 text-xs">@{user.username} • {user.major}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleUserSelection(user.id)}
                        className={`p-1 rounded-full ${selectedUsers.includes(user.id) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      >
                        {selectedUsers.includes(user.id) ? <FiUserCheck size={16} /> : <FiUserPlus size={16} />}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-4">No users found</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">Add a Message (optional)</label>
              <textarea
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {selectedUsers.length > 0 && (
              <div className="mb-4">
                <h3 className="text-gray-300 text-sm font-medium mb-2">Selected Users</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map(userId => {
                    const user = users.find(u => u.id === userId);
                    return (
                      <div key={userId} className="flex items-center bg-gray-700 rounded-full pl-2 pr-1 py-1">
                        <span className="text-white text-sm">{user.name}</span>
                        <button
                          onClick={() => toggleUserSelection(userId)}
                          className="ml-1 text-gray-300 hover:text-white"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsShareModalOpen(false);
                  setSelectedUsers([]);
                  setMessage('');
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleShareSubmit}
                disabled={selectedUsers.length === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedUsers.length === 0 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Send ({selectedUsers.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
