interface GameHeaderProps {
  user?: { name: string } | null;
  handleLogout: () => void;
}

const GameHeader = ({ user, handleLogout }: GameHeaderProps) => {
  return (
    <>
        <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-blue-600/70 to-purple-700/70 text-white py-3 shadow-lg z-20">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img
                    src="/react.svg"
                    alt="Game Logo"
                    className="w-10 h-10"
                    />
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
                    Play Game
                    </h1>
                </div>

                {user && (
                    <div className="flex items-center space-x-3">
                        <p className="hidden sm:block text-base md:text-lg font-semibold">
                            Welcome, <span className="font-bold">{user.name}</span>
                        </p>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 rounded-md text-sm md:text-base font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    </>
  );
};

export default GameHeader;
