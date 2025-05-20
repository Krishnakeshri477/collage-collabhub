// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { FiSearch, FiUserPlus, FiUserCheck, FiX } from 'react-icons/fi';

const ShareModal = ({ 
  isOpen, 
  onClose, 
  users, 
  searchTerm, 
  setSearchTerm, 
  selectedUsers, 
  toggleUserSelection, 
  message, 
  setMessage, 
  onSubmit 
}) => {
  if (!isOpen) return null;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Share Post</h2>
          <button 
            onClick={onClose}
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
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={selectedUsers.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors ${selectedUsers.length === 0 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Send ({selectedUsers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
