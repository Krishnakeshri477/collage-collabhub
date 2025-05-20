import { useState, useRef } from 'react';
import { FiImage, FiX } from 'react-icons/fi';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    skills: '',
    media: null,
    mediaPreview: null
  });
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({
          ...newPost,
          media: file,
          mediaPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mediaUrl = newPost.mediaPreview || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80';
    
    const postData = {
      title: newPost.title,
      description: newPost.description,
      skills: newPost.skills.split(',').map(skill => skill.trim()),
      media: mediaUrl
    };

    onSubmit(postData);
    
    // Reset form
    setNewPost({ 
      title: '', 
      description: '', 
      skills: '', 
      media: null,
      mediaPreview: null 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create New Post</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
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
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">Skills Needed (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={newPost.skills}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Python, Design"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition-colors"
            >
              {newPost.mediaPreview ? (
                <div className="relative">
                  <img 
                    src={newPost.mediaPreview} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewPost({...newPost, media: null, mediaPreview: null});
                    }}
                    className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <FiImage size={40} className="mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400">Click to upload an image</p>
                  <p className="text-xs text-gray-500">(optional)</p>
                </>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default CreatePostModal;
