import React from 'react';
import Navbar from '../components/Layout/Navbar';

const Profile = () => {
  // Sample student profile data
  const profile = {
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
  };

  // Sample projects data
  const projects = [
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
  ];

  // Sample courses data
  const courses = [
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
  ];

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
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-300 mb-4">{profile.bio}</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">{profile.email}</span>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-sm border border-gray-600">
                    {skill}
                  </span>
                ))}
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
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Projects</h2>
                <button className="text-blue-400 hover:text-blue-300">View All</button>
              </div>
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
                <button className="text-blue-400 hover:text-blue-300">View All</button>
              </div>
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
