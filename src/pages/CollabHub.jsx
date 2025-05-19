import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import { FiMessageSquare, FiHeart, FiShare2, FiBookmark, FiMoreHorizontal, FiPlus } from 'react-icons/fi';

const CollabHub = () => {
  // Sample project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        username: 'alex_dev',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        major: 'Computer Science',
        batch: '2023'
      },
      title: 'Campus Navigation App',
      description: 'Building an AR-based navigation system for our college campus to help new students find their way around. Looking for developers with experience in React Native and ARKit.',
      skills: ['React Native', 'ARKit', 'JavaScript', 'UI/UX Design'],
      likes: 24,
      comments: 8,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      user: {
        name: 'Sarah Williams',
        username: 'sarah_data',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        major: 'Data Science',
        batch: '2022'
      },
      title: 'AI Course Recommender',
      description: 'Developing a machine learning system to suggest courses based on student interests and past performance. Need team members with Python and ML experience.',
      skills: ['Python', 'Machine Learning', 'Flask', 'Pandas'],
      likes: 42,
      comments: 15,
      isLiked: true,
      isBookmarked: false
    }
  ]);

  // State for new post modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    skills: '',
  });

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
    const newProject = {
      id: projects.length + 1,
      user: {
        name: 'Current User',
        username: 'current_user',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        major: 'Your Major',
        batch: '2023'
      },
      title: newPost.title,
      description: newPost.description,
      skills: newPost.skills.split(',').map(skill => skill.trim()),
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false
    };

    setProjects([newProject, ...projects]);
    setNewPost({ title: '', description: '', skills: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header with Add Post button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Collaboration Hub</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus size={20} />
            <span>Add Post</span>
          </button>
        </div>
        
        {/* Projects List */}
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-700">
            {/* User Info Section */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={project.user.avatar} 
                  alt={project.user.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h2 className="font-semibold text-white">{project.user.name}</h2>
                  <p className="text-sm text-gray-400">@{project.user.username} • {project.user.major} '{project.user.batch}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Connect
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
            </div>
            
            {/* Project Description */}
            <div className="px-4 pb-3">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
            </div>
            
            {/* Skills Required */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">SKILLS REQUIRED</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-xs font-medium border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Interaction Bar */}
            <div className="border-t border-gray-700 px-4 py-3 flex justify-between items-center">
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleLike(project.id)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-red-400"
                >
                  <FiHeart 
                    size={20} 
                    className={project.isLiked ? 'fill-current text-red-500' : ''} 
                  />
                  <span className={project.isLiked ? 'text-red-400' : 'text-gray-400'}>{project.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400">
                  <FiMessageSquare size={20} />
                  <span>{project.comments}</span>
                </button>
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-400 hover:text-blue-400">
                  <FiShare2 size={20} />
                </button>
                <button 
                  onClick={() => handleBookmark(project.id)}
                  className="text-gray-400 hover:text-blue-400"
                >
                  <FiBookmark 
                    size={20} 
                    className={project.isBookmarked ? 'fill-current text-blue-500' : ''} 
                  />
                </button>
              </div>
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
                <label className="block text-gray-300 text-sm font-medium mb-2">Project Title</label>
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
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Skills Needed (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={newPost.skills}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, UI/UX"
                />
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
    </div>
  );
};

export default CollabHub;
