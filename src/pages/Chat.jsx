import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';

const Chat = () => {
  // Sample chat data with dark theme styling
  const chatData = [
    {
      id: 1,
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'sarah_j',
      status: 'Active now',
      messages: [
        { id: 1, text: 'Hey there! How are you doing?', incoming: true, time: '2:45 PM' },
        { id: 2, text: "I'm doing great! Thanks for asking.", incoming: false, time: '2:47 PM' },
        { id: 3, text: 'Want to meet up this weekend?', incoming: true, time: '2:49 PM' },
      ],
      lastMessage: 'Want to meet up this weekend?',
      timestamp: '2 min ago',
      unread: 3
    },
    {
      id: 2,
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'mike_t',
      status: 'Last seen 1 hour ago',
      messages: [
        { id: 1, text: 'About our meeting tomorrow...', incoming: true, time: '1:30 PM' },
        { id: 2, text: "Yes, I'll bring the project files", incoming: false, time: '1:35 PM' },
      ],
      lastMessage: 'About our meeting tomorrow...',
      timestamp: '1 hour ago',
      unread: 0
    },
    {
      id: 3,
      userImage: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'emily_r',
      status: 'Last seen today at 3:20 PM',
      messages: [
        { id: 1, text: 'The documents are ready!', incoming: true, time: '11:20 AM' },
        { id: 2, text: "Great, I'll review them today", incoming: false, time: '11:25 AM' },
      ],
      lastMessage: 'The documents are ready!',
      timestamp: '3 hours ago',
      unread: 1
    },
  ];

  const [activeChat, setActiveChat] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const updatedChats = chatData.map(chat => {
      if (chat.id === activeChat.id) {
        const newMsg = {
          id: chat.messages.length + 1,
          text: newMessage,
          incoming: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage,
          timestamp: 'Just now'
        };
      }
      return chat;
    });

    setActiveChat(updatedChats.find(chat => chat.id === activeChat.id));
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Chat list */}
        <div className="w-1/3 border-r border-gray-700 bg-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
            <h2 className="text-xl font-bold text-gray-100">Messages</h2>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search messages"
                className="w-full p-2 pl-10 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Chat list */}
          <div className="divide-y divide-gray-700">
            {chatData.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-4 hover:bg-gray-700 cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <img
                  src={chat.userImage}
                  alt={chat.username}
                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-600"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-100">{chat.username}</h3>
                    <span className="text-xs text-gray-400">{chat.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-400 truncate max-w-[180px]">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-gray-800">
          {/* Chat header */}
          {activeChat && (
            <>
              <div className="p-4 border-b border-gray-700 flex items-center bg-gray-800">
                <img
                  src={activeChat.userImage}
                  alt={activeChat.username}
                  className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-600"
                />
                <div>
                  <h3 className="font-semibold text-gray-100">{activeChat.username}</h3>
                  <p className="text-xs text-gray-400">{activeChat.status}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {activeChat.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex items-start ${message.incoming ? '' : 'justify-end'}`}
                    >
                      {message.incoming && (
                        <img
                          src={activeChat.userImage}
                          alt={activeChat.username}
                          className="w-8 h-8 rounded-full mr-3 border-2 border-gray-600"
                        />
                      )}
                      <div className={message.incoming ? '' : 'text-right'}>
                        <div className={`p-3 rounded-lg max-w-xs inline-block ${
                          message.incoming 
                            ? 'bg-gray-700 rounded-tl-none text-gray-100' 
                            : 'bg-blue-600 text-white rounded-tr-none'
                        }`}>
                          <p>{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex items-center">
                  <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 p-2 mx-2 rounded-full bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={handleSendMessage}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
