import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import { FaEllipsisH, FaCheck, FaRegComment, FaHeart, FaUserPlus, FaShare, FaAt } from 'react-icons/fa';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'travel_enthusiast',
      action: 'liked your post',
      actionIcon: <FaHeart className="text-red-500" />,
      postPreview: 'Sunset views from Santorini 🌅',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'foodie_adventures',
      action: 'commented on your photo',
      actionIcon: <FaRegComment className="text-blue-400" />,
      comment: 'This looks amazing! Where is this?',
      time: '15 minutes ago',
      read: true
    },
    {
      id: 3,
      userImage: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'tech_guru',
      action: 'started following you',
      actionIcon: <FaUserPlus className="text-green-400" />,
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      userImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'fitness_motivation',
      action: 'mentioned you in a comment',
      actionIcon: <FaAt className="text-purple-400" />,
      comment: '@username Check out this workout!',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      userImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'photography_lover',
      action: 'shared your story',
      actionIcon: <FaShare className="text-yellow-400" />,
      time: '1 day ago',
      read: true
    }
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Calculate unread count
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar unreadCount={unreadCount} />
      
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Notifications</h1>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
            >
              <FaCheck className="mr-1" /> Mark all as read
            </button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg ${notification.read ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-700/80 transition-colors cursor-pointer`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img 
                      src={notification.userImage} 
                      alt={notification.username} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gray-800 p-1 rounded-full">
                      {notification.actionIcon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-100 text-sm">
                          <span className="font-semibold hover:text-blue-400">{notification.username}</span>{' '}
                          <span>{notification.action}</span>
                        </p>
                        
                        {notification.comment && (
                          <p className="mt-1 text-gray-300 text-xs bg-gray-700/50 p-2 rounded-lg">
                            {notification.comment}
                          </p>
                        )}
                        
                        {notification.postPreview && (
                          <p className="mt-1 text-gray-400 text-xs italic">
                            "{notification.postPreview}"
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                        <button 
                          className="text-gray-400 hover:text-gray-200 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <FaEllipsisH className="text-sm" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
