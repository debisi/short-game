const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="flex flex-col items-center mt-40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Log in</h2>
          <p className="text-gray-500 mt-2">Sign in to your account to play game</p>
        </div>

        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
