import React from 'react';
import Navbar from '../components/Layout/Navbar';

const Notification = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'travel_enthusiast',
      action: 'liked your post',
      postPreview: 'Sunset views from Santorini 🌅',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'foodie_adventures',
      action: 'commented on your photo',
      comment: 'This looks amazing! Where is this?',
      time: '15 minutes ago',
      read: true
    },
    {
      id: 3,
      userImage: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'tech_guru',
      action: 'started following you',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      userImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'fitness_motivation',
      action: 'mentioned you in a comment',
      comment: '@username Check out this workout!',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      userImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'photography_lover',
      action: 'shared your story',
      time: '1 day ago',
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Notifications</h1>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Mark all as read
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-xl ${notification.read ? 'bg-gray-800' : 'bg-gray-700'} border border-gray-700 hover:border-gray-600 transition-colors`}
            >
              <div className="flex items-start">
                <img 
                  src={notification.userImage} 
                  alt={notification.username} 
                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-600"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-100">
                        <span className="font-semibold hover:text-blue-400 cursor-pointer">{notification.username}</span>{' '}
                        <span>{notification.action}</span>
                      </p>
                      
                      {notification.comment && (
                        <p className="mt-1 text-gray-300 text-sm bg-gray-700 p-2 rounded-lg">
                          {notification.comment}
                        </p>
                      )}
                      
                      {notification.postPreview && (
                        <p className="mt-1 text-gray-400 text-sm italic">
                          "{notification.postPreview}"
                        </p>
                      )}
                    </div>
                    
                    {!notification.read && (
                      <div className="ml-2 w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-400">{notification.time}</p>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-400 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
