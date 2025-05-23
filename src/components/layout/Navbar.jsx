import React from 'react';
import { FaHome, FaBell, FaComments, FaSearch } from 'react-icons/fa';
import { FaProjectDiagram, FaSitemap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ user, unreadChart = 0 ,unreadNotification = 0 }) => {
  return (
    <nav className='flex justify-between items-center bg-zinc-800 p-4 text-white sticky top-0 z-50'>
      <di className='bg-zinc-700 rounded-full px-4 py-2 space-x-2'>
        <Link to="/collabhub" className='flex items-center font-semibold hover:text-blue-400 transition-colors'>
           <FaSitemap className='text-xl' />
          Collab Hub
        </Link>
      </di>
      
      {/* Search Bar */}
      <div className='flex items-center bg-zinc-700 rounded-full px-4 py-2 w-1/3'>
        <FaSearch className='text-zinc-400 mr-2' />
        <input 
          type='text' 
          placeholder='Search...' 
          className='bg-transparent border-none outline-none w-full text-white placeholder-zinc-400'
        />
      </div>
      
      {/* Navigation Icons */}
      <div className='flex items-center space-x-6'>
        <Link to="/" className='hover:text-blue-400 transition-colors'>
          <FaHome className='text-xl' />
        </Link>
        <Link to="/chat" className='hover:text-blue-400 transition-colors relative'>
          <FaComments className='text-xl' />
          {unreadNotification > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center'>
              {unreadNotification > 9 ? '9+' : unreadNotification}
            </span>
          )}
        </Link>
        <Link to="/notifications" className='hover:text-blue-400 transition-colors relative'>
          <FaBell className='text-xl' />
          {unreadChart > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center'>
              {unreadChart > 9 ? '9+' : unreadChart}
            </span>
          )}
        </Link>
        <Link to="/profile" className='hover:text-blue-400 transition-colors'>
          {user?.profileImage ? (
            <img 
              src={user.profileImage} 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.fullName?.charAt(0) || 'U'}
              </span>
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
