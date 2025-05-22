import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Layout/Navbar';
import { FiSearch, FiPaperclip, FiSend, FiMoreVertical, FiCheck, FiCheckCircle } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import { BsThreeDotsVertical, BsEmojiSmile } from 'react-icons/bs';
import { RiChatDeleteLine } from 'react-icons/ri';

const Chat = () => {
  // Sample chat data with dark theme styling
  const [chatData, setChatData] = useState([
    {
      id: 1,
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'sarah_j',
      status: 'Active now',
      messages: [
        { id: 1, text: 'Hey there! How are you doing?', incoming: true, time: '2:45 PM', read: true },
        { id: 2, text: "I'm doing great! Thanks for asking.", incoming: false, time: '2:47 PM', read: true },
        { id: 3, text: 'Want to meet up this weekend?', incoming: true, time: '2:49 PM', read: false },
      ],
      lastMessage: 'Want to meet up this weekend?',
      timestamp: '2 min ago',
      unread: 3,
      online: true
    },
    {
      id: 2,
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'mike_t',
      status: 'Last seen 1 hour ago',
      messages: [
        { id: 1, text: 'About our meeting tomorrow...', incoming: true, time: '1:30 PM', read: true },
        { id: 2, text: "Yes, I'll bring the project files", incoming: false, time: '1:35 PM', read: true },
      ],
      lastMessage: 'About our meeting tomorrow...',
      timestamp: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      userImage: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      username: 'emily_r',
      status: 'Last seen today at 3:20 PM',
      messages: [
        { id: 1, text: 'The documents are ready!', incoming: true, time: '11:20 AM', read: true },
        { id: 2, text: "Great, I'll review them today", incoming: false, time: '11:25 AM', read: true },
      ],
      lastMessage: 'The documents are ready!',
      timestamp: '3 hours ago',
      unread: 1,
      online: false
    },
  ]);

  const [activeChat, setActiveChat] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const updatedChats = chatData.map(chat => {
      if (chat.id === activeChat.id) {
        const newMsg = {
          id: chat.messages.length + 1,
          text: newMessage,
          incoming: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        };
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage,
          timestamp: 'Just now',
          unread: 0 // Reset unread when sending a message
        };
      }
      return chat;
    });

    setChatData(updatedChats);
    setActiveChat(updatedChats.find(chat => chat.id === activeChat.id));
    setNewMessage('');
  };

  const handleChatSelect = (chat) => {
    // Mark messages as read when selecting a chat
    const updatedChats = chatData.map(c => {
      if (c.id === chat.id) {
        const updatedMessages = c.messages.map(m => ({ ...m, read: true }));
        return { ...c, messages: updatedMessages, unread: 0 };
      }
      return c;
    });
    
    setChatData(updatedChats);
    setActiveChat(updatedChats.find(c => c.id === chat.id));
    setShowOptions(null);
  };

  const deleteChat = (chatId) => {
    const updatedChats = chatData.filter(chat => chat.id !== chatId);
    setChatData(updatedChats);
    if (activeChat.id === chatId && updatedChats.length > 0) {
      setActiveChat(updatedChats[0]);
    } else if (updatedChats.length === 0) {
      setActiveChat(null);
    }
    setShowOptions(null);
  };

  const filteredChats = chatData.filter(chat => 
    chat.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = chatData.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar unreadCount={totalUnread} />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Chat list */}
        <div className="w-full md:w-1/3 border-r border-gray-800 bg-gray-900 overflow-y-auto">
          <div className="p-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-100">Messages</h2>
              <button className="text-blue-400 hover:text-blue-300">
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
            
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full p-2 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Chat list */}
          <div className="divide-y divide-gray-800">
            {filteredChats.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No chats found</div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-colors ${
                    activeChat?.id === chat.id ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="relative mr-3">
                    <img
                      src={chat.userImage}
                      alt={chat.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-100 truncate">{chat.username}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{chat.timestamp}</span>
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
              ))
            )}
          </div>
        </div>

        {/* Main chat area */}
        <div className="hidden md:flex flex-1 flex-col bg-gray-900">
          {activeChat ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900 sticky top-0 z-10">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img
                      src={activeChat.userImage}
                      alt={activeChat.username}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                    />
                    {activeChat.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">{activeChat.username}</h3>
                    <p className="text-xs text-gray-400">
                      {activeChat.online ? 'Online' : activeChat.status}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    className="text-gray-400 hover:text-blue-400 p-1"
                    onClick={() => setShowOptions(showOptions === activeChat.id ? null : activeChat.id)}
                  >
                    <BsThreeDotsVertical size={18} />
                  </button>
                  {showOptions === activeChat.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-20">
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                        onClick={() => deleteChat(activeChat.id)}
                      >
                        <RiChatDeleteLine className="mr-2" />
                        Delete Chat
                      </button>
                    </div>
                  )}
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
                          className="w-8 h-8 rounded-full mr-3 border-2 border-gray-700"
                        />
                      )}
                      <div className={message.incoming ? '' : 'text-right'}>
                        <div className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg inline-block ${
                          message.incoming 
                            ? 'bg-gray-800 rounded-tl-none text-gray-100' 
                            : 'bg-blue-600 text-white rounded-tr-none'
                        }`}>
                          <p>{message.text}</p>
                        </div>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <p className="text-xs text-gray-400">{message.time}</p>
                          {!message.incoming && (
                            message.read ? (
                              <FiCheckCircle className="text-blue-400 text-xs" />
                            ) : (
                              <FiCheck className="text-gray-400 text-xs" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-800 bg-gray-900 sticky bottom-0">
                <div className="flex items-center">
                  <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <BsEmojiSmile size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <FiPaperclip size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 mx-2 rounded-full bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className={`p-2 transition-colors ${
                      newMessage.trim() ? 'text-blue-400 hover:text-blue-300' : 'text-gray-500'
                    }`}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <IoMdSend size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <div className="text-center p-6 max-w-md">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">No chat selected</h3>
                <p>Select a chat from the sidebar or start a new conversation</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile view when no chat is selected */}
        {!activeChat && (
          <div className="md:hidden flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-900">
            <div className="text-center p-6 max-w-md">
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Select a chat</h3>
              <p>Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
