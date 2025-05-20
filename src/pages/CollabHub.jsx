import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import { FiMessageSquare, FiHeart, FiShare2, FiBookmark, FiMoreHorizontal, FiPlus, FiUserPlus, FiUserCheck } from 'react-icons/fi';
import MessageFeature from '../components/Feature/MessageFeature';
import CreatePostModal from '../components/Feature/CreatePostModal';
import ShareModal from '../components/Feature/ShareModal';

const CollabHub = () => {
  // Sample users data
  const users = [
    { id: 1, name: 'Alex Johnson', username: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Computer Science' },
    { id: 2, name: 'Sarah Williams', username: 'sarah_data', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Data Science' },
    { id: 3, name: 'Michael Chen', username: 'michael_c', avatar: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Electrical Engineering' },
    { id: 4, name: 'Emma Wilson', username: 'emma_design', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', major: 'Graphic Design' },
  ];

  // Sample project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      username: 'alex_dev',
      userImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Computer Science',
      title: 'Campus Navigation App',
      description: 'Building an AR-based navigation system for our college campus to help new students find their way around. Looking for developers with experience in React Native and ARKit.',
      skills: ['React Native', 'ARKit', 'JavaScript', 'UI/UX Design'],
      likes: 24,
      commentsCount: 2,
      comments: [
        { id: 1, text: "This sounds interesting! What's your timeline?", username: 'react_lover', timestamp: '2 hours ago' },
        { id: 2, text: 'I have ARKit experience. Let me know how I can help!', username: 'ar_enthusiast', timestamp: '1 hour ago' }
      ],
      timestamp: '3 hours ago',
      isLiked: false,
      isBookmarked: false,
      isConnected: false
    },
    {
      id: 2,
      username: 'sarah_data',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Data Science',
      title: 'AI Course Recommender',
      description: 'Developing a machine learning system to suggest courses based on student interests and past performance. Need team members with Python and ML experience.',
      skills: ['Python', 'Machine Learning', 'Flask', 'Pandas'],
      likes: 42,
      commentsCount: 3,
      comments: [
        { id: 1, text: 'What dataset are you using?', username: 'data_nerd', timestamp: '3 hours ago' },
        { id: 2, text: 'I can help with the Flask backend', username: 'python_dev', timestamp: '2 hours ago' },
        { id: 3, text: 'Have you considered using TensorFlow?', username: 'ml_expert', timestamp: '1 hour ago' }
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
  const handleLike = (projectId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          isLiked: !project.isLiked,
          likes: project.isLiked ? project.likes - 1 : project.likes + 1
        };
      }
      return project;
    }));
  };

  // Handle bookmark action
  const handleBookmark = (projectId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          isBookmarked: !project.isBookmarked
        };
      }
      return project;
    }));
  };

  // Handle connect action
  const handleConnect = (projectId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          isConnected: !project.isConnected
        };
      }
      return project;
    }));
  };

  // Handle share button click
  const handleShareClick = (projectId) => {
    setCurrentPostId(projectId);
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
    console.log(`Shared project ${currentPostId} with users:`, selectedUsers);
    console.log('Message:', message);
    
    alert(`Project shared with ${selectedUsers.length} user(s)!`);
    
    setSelectedUsers([]);
    setMessage('');
    setIsShareModalOpen(false);
  };

  // Handle comment submission
  const handleCommentSubmit = (projectId, commentText) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newComment = {
          id: project.comments.length + 1,
          text: commentText,
          username: 'current_user',
          timestamp: 'Just now'
        };
        return {
          ...project,
          comments: [...project.comments, newComment],
          commentsCount: project.commentsCount + 1
        };
      }
      return project;
    }));
  };

  // Handle new post submission
  const handleNewPostSubmit = (postData) => {
    const newProject = {
      id: projects.length + 1,
      username: 'current_user',
      userImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      userMajor: 'Your Major',
      title: postData.title,
      description: postData.description,
      skills: postData.skills.split(',').map(skill => skill.trim()),
      likes: 0,
      commentsCount: 0,
      comments: [],
      timestamp: 'Just now',
      isLiked: false,
      isBookmarked: false,
      isConnected: false
    };

    setProjects([newProject, ...projects]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
        {/* Header with Add Post button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Collaboration Hub</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus size={20} />
            <span>Create Post</span>
          </button>
        </div>

        {/* Projects Feed */}
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-700">
            {/* Project header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={project.userImage} 
                  alt={project.username} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                />
                <div>
                  <h3 className="font-semibold text-white">@{project.username}</h3>
                  <p className="text-xs text-gray-400">{project.userMajor} • {project.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleConnect(project.id)}
                  className={`p-2 rounded-full ${project.isConnected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-colors`}
                >
                  {project.isConnected ? <FiUserCheck size={18} /> : <FiUserPlus size={18} />}
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
            </div>
            
            {/* Project title and description */}
            <div className="px-4 pb-3">
              <h2 className="text-lg font-bold text-white mb-1">{project.title}</h2>
              <p className="text-gray-300 text-sm">
                {project.description}
              </p>
            </div>

            {/* Skills required */}
            {project.skills && project.skills.length > 0 && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
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

            {/* Project actions */}
            <div className="flex p-4 justify-between text-gray-400">
              <button 
                onClick={() => handleLike(project.id)}
                className="flex items-center space-x-1 hover:text-red-400 transition-colors"
              >
                <FiHeart 
                  size={20} 
                  className={project.isLiked ? 'fill-current text-red-500' : ''} 
                />
                <span className={`text-sm ${project.isLiked ? 'text-red-400' : 'text-gray-400'}`}>
                  {project.likes}
                </span>
              </button>
              
              <MessageFeature
                postId={project.id}
                comments={project.comments}
                commentsCount={project.commentsCount}
                onCommentSubmit={handleCommentSubmit}
              />
              
              <button 
                onClick={() => handleShareClick(project.id)}
                className="flex items-center space-x-1 hover:text-green-400 transition-colors"
              >
                <FiShare2 size={20} />
              </button>
              
              <button 
                onClick={() => handleBookmark(project.id)}
                className="flex items-center space-x-1 hover:text-purple-400 transition-colors"
              >
                <FiBookmark 
                  size={20} 
                  className={project.isBookmarked ? 'fill-current text-purple-500' : ''} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      <CreatePostModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPostSubmit}
        title="Create New Project"
        fields={[
          {
            name: 'title',
            label: 'Project Title',
            type: 'text',
            placeholder: 'Enter project title'
          },
          {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Describe your project...'
          },
          {
            name: 'skills',
            label: 'Skills Needed (comma separated)',
            type: 'text',
            placeholder: 'React, Node.js, UI/UX'
          }
        ]}
      />

      {/* Share Modal */}
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

export default CollabHub;
