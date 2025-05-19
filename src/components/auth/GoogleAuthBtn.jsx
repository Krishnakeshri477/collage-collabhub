const GoogleAuthBtn = ({ isLogin = true }) => {
  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
        alt="Google logo" 
        className="h-5 w-5 mr-2"
      />
      {isLogin ? 'Login with Google' : 'Sign up with Google'}
    </button>
  );
};

export default GoogleAuthBtn;