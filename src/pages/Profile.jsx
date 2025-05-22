import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';

const Profile = () => {
  // Sample student profile data
  const [profile, setProfile] = useState({
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john.doe@college.edu',
    bio: 'Computer Science Senior | Full Stack Developer | Interested in AI and Machine Learning',
    profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=400&q=80',
    collegeId: 'CS2021001',
    major: 'Computer Science',
    batch: '2021',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
    projects: 8,
    connections: 124,
    courses: 32
  });

  // State for editing about section
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editedBio, setEditedBio] = useState(profile.bio);
  
  // State for adding new skill
  const [newSkill, setNewSkill] = useState('');
  
  // State for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'College Chat Application',
      description: 'A real-time chat platform for students to collaborate',
      tags: ['React', 'Node.js', 'Socket.io'],
      members: 4,
      status: 'Active'
    },
    {
      id: 2,
      title: 'AI Course Recommender',
      description: 'Machine learning system to suggest courses based on student interests',
      tags: ['Python', 'TensorFlow', 'Flask'],
      members: 3,
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Campus Navigation App',
      description: 'AR-based navigation system for college campus',
      tags: ['React Native', 'ARKit', 'Firebase'],
      members: 5,
      status: 'In Progress'
    }
  ]);
  
  // State for new project form
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tags: '',
    members: '',
    status: 'Active'
  });
  
  // State for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: 'CS401',
      name: 'Advanced Algorithms',
      professor: 'Dr. Smith',
      semester: 'Fall 2023'
    },
    {
      id: 2,
      code: 'CS402',
      name: 'Machine Learning',
      professor: 'Dr. Johnson',
      semester: 'Spring 2023'
    },
    {
      id: 3,
      code: 'CS305',
      name: 'Database Systems',
      professor: 'Dr. Williams',
      semester: 'Fall 2022'
    }
  ]);
  
  // State for new course form
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    professor: '',
    semester: ''
  });
  
  // State for experience
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: 'Software Engineering Intern',
      company: 'Tech Corp',
      duration: 'Jun 2023 - Aug 2023',
      description: 'Worked on frontend development using React and backend APIs'
    },
    {
      id: 2,
      role: 'Research Assistant',
      company: 'University AI Lab',
      duration: 'Jan 2023 - May 2023',
      description: 'Assisted in machine learning research projects'
    }
  ]);
  
  // State for new experience form
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    duration: '',
    description: ''
  });
  
  // State for activity (posts)
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Just completed my final project for Machine Learning course! Learned so much about neural networks.',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      content: 'Looking for team members for a hackathon project. We\'re building an educational platform using React and Node.js. DM if interested!',
      timestamp: '1 day ago',
      likes: 12,
      comments: 8
    }
  ]);
  
  // State for new post
  const [newPost, setNewPost] = useState('');

  // Handle saving edited bio
  const handleSaveAbout = () => {
    setProfile({ ...profile, bio: editedBio });
    setIsEditingAbout(false);
  };

  // Handle adding new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  // Handle removing skill
  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Handle adding new project
  const handleAddProject = () => {
    const project = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(',').map(tag => tag.trim()),
      members: parseInt(newProject.members),
      status: newProject.status
    };
    
    setProjects([...projects, project]);
    setShowProjectForm(false);
    setNewProject({
      title: '',
      description: '',
      tags: '',
      members: '',
      status: 'Active'
    });
  };

  // Handle adding new course
  const handleAddCourse = () => {
    const course = {
      id: courses.length + 1,
      code: newCourse.code,
      name: newCourse.name,
      professor: newCourse.professor,
      semester: newCourse.semester
    };
    
    setCourses([...courses, course]);
    setShowCourseForm(false);
    setNewCourse({
      code: '',
      name: '',
      professor: '',
      semester: ''
    });
  };

  // Handle adding new experience
  const handleAddExperience = () => {
    const experience = {
      id: experiences.length + 1,
      role: newExperience.role,
      company: newExperience.company,
      duration: newExperience.duration,
      description: newExperience.description
    };
    
    setExperiences([...experiences, experience]);
    setShowExperienceForm(false);
    setNewExperience({
      role: '',
      company: '',
      duration: '',
      description: ''
    });
  };

  // Handle adding new post
  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0
      };
      
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Cover Photo */}
      <div className="relative h-64 w-full bg-gray-800">
        <img 
          src={profile.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <div className="flex items-start md:items-end">
            <img 
              src={profile.profileImage} 
              alt={profile.username} 
              className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover shadow-lg"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
              <p className="text-gray-400">@{profile.username}</p>
              <p className="text-gray-400 mt-1">{profile.major}, Batch of {profile.batch}</p>
              <p className="text-gray-400">{profile.collegeId}</p>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md">
              Connect
            </button>
            <button className="px-6 py-2 rounded-lg font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors shadow-md">
              Message
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">About</h2>
                <button 
                  onClick={() => setIsEditingAbout(!isEditingAbout)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {isEditingAbout ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              {isEditingAbout ? (
                <div>
                  <textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    rows="4"
                  />
                  <button
                    onClick={handleSaveAbout}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 mb-4">{profile.bio}</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">{profile.email}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Skills */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="flex items-center px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-sm border border-gray-600">
                    {skill}
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-gray-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                  className="flex-1 bg-gray-700 text-white rounded-l-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Stats</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-400">{profile.projects}</p>
                  <p className="text-gray-400 text-sm">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">{profile.connections}</p>
                  <p className="text-gray-400 text-sm">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">{profile.courses}</p>
                  <p className="text-gray-400 text-sm">Courses</p>
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Experience</h2>
                <button 
                  onClick={() => setShowExperienceForm(!showExperienceForm)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {showExperienceForm ? 'Cancel' : 'Add'}
                </button>
              </div>
              
              {showExperienceForm && (
                <div className="mb-6 p-4 bg-gray-750 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-white mb-3">Add New Experience</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newExperience.role}
                      onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
                      placeholder="Role"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                      placeholder="Company"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                      placeholder="Duration (e.g., Jun 2023 - Aug 2023)"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                      placeholder="Description"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      rows="3"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowExperienceForm(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddExperience}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id} className="border-l-2 border-blue-500 pl-4 py-2">
                    <h3 className="font-bold text-white">{exp.role}</h3>
                    <p className="text-gray-300">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.duration}</p>
                    <p className="text-gray-400 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity (Posts) */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Activity</h2>
              
              {/* New Post Form */}
              <div className="mb-6">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share something with your network..."
                  className="w-full bg-gray-700 text-white rounded-lg p-4 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddPost}
                    disabled={!newPost.trim()}
                    className={`px-4 py-2 rounded-lg font-medium ${newPost.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                  >
                    Post
                  </button>
                </div>
              </div>
              
              {/* Posts List */}
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="border border-gray-700 rounded-lg p-4 bg-gray-750">
                    <div className="flex items-start">
                      <img 
                        src={profile.profileImage} 
                        alt={profile.username} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-bold text-white mr-2">{profile.fullName}</h3>
                          <span className="text-gray-400 text-sm">@{profile.username}</span>
                          <span className="text-gray-500 text-sm mx-1">·</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                        </div>
                        <p className="text-gray-300 mt-1">{post.content}</p>
                        <div className="flex items-center mt-3 text-gray-400 space-x-4">
                          <button className="flex items-center hover:text-blue-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center hover:text-blue-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Projects */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Projects</h2>
                <button 
                  onClick={() => setShowProjectForm(!showProjectForm)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {showProjectForm ? 'Cancel' : 'Add Project'}
                </button>
              </div>
              
              {showProjectForm && (
                <div className="mb-6 p-4 bg-gray-750 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-white mb-3">Add New Project</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder="Project Title"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Description"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      rows="3"
                    />
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                      placeholder="Tags (comma separated)"
                      className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Members</label>
                        <input
                          type="number"
                          value={newProject.members}
                          onChange={(e) => setNewProject({...newProject, members: e.target.value})}
                          className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Status</label>
                        <select
                          value={newProject.status}
                          onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                          className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowProjectForm(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddProject}
                        disabled={!newProject.title.trim()}
                        className={`px-4 py-2 rounded-lg font-medium ${newProject.title.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                      >
                        Add Project
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all bg-gray-750">
                    <h3 className="font-bold text-lg text-white">{project.title}</h3>
                    <p className="text-gray-400 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs border border-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'Active' ? 'bg-green-900 text-green-400 border border-green-800' :
                        project.status === 'Completed' ? 'bg-blue-900 text-blue-400 border border-blue-800' :
                        'bg-yellow-900 text-yellow-400 border border-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-400">{project.members} members</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Courses */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Courses</h2>
                <button 
                  onClick={() => setShowCourseForm(!showCourseForm)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {showCourseForm ? 'Cancel' : 'Add Course'}
                </button>
              </div>
              
              {showCourseForm && (
                <div className="mb-6 p-4 bg-gray-750 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-white mb-3">Add New Course</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Course Code</label>
                      <input
                        type="text"
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                        placeholder="e.g., CS401"
                        className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Course Name</label>
                      <input
                        type="text"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                        placeholder="e.g., Advanced Algorithms"
                        className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Professor</label>
                      <input
                        type="text"
                        value={newCourse.professor}
                        onChange={(e) => setNewCourse({...newCourse, professor: e.target.value})}
                        placeholder="e.g., Dr. Smith"
                        className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Semester</label>
                      <input
                        type="text"
                        value={newCourse.semester}
                        onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
                        placeholder="e.g., Fall 2023"
                        className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => setShowCourseForm(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCourse}
                      disabled={!newCourse.code.trim() || !newCourse.name.trim()}
                      className={`px-4 py-2 rounded-lg font-medium ${newCourse.code.trim() && newCourse.name.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    >
                      Add Course
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(course => (
                  <div key={course.id} className="border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all bg-gray-750">
                    <h3 className="font-bold text-white">{course.code}: {course.name}</h3>
                    <p className="text-gray-400 mt-1">Professor: {course.professor}</p>
                    <p className="text-gray-500 text-sm mt-2">{course.semester}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
