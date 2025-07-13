import { useGameLogic } from '../hooks/useGameLogic';
import GameHeader from '../components/GameHeader';
import GameChoices from '../components/GameChoices';
import GameScoreboard from '../components/GameScoreboard';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/game-battle-animation.css';

interface GameUser {
  name: string;
  email: string;
  userId: string;
}

const GamePage = ({ user, onUserChange }: { user: GameUser | null; onUserChange: (user: GameUser | null) => void }) => {
  const {
    choicesState,
    battleState,
    isPlaying,
    handleChoiceSelect,
    handleRandomChoice,
  } = useGameLogic();

  const { playerChoiceName, computerChoiceName, resultText } = choicesState;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/logout', { withCredentials: true });
      onUserChange(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="relative flex flex-col items-center h-screen pt-[72px] overflow-x-hidden ">
      <GameHeader user={user} handleLogout={handleLogout} />

      {/* Main UI blurred and disabled when battling */}
      <div
        className={`transition-filter duration-300 w-full max-w-5xl mt-4 px-4 ${
          battleState !== 'idle' ? 'filter blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div
            className="flex-1 rounded-2xl shadow-md backdrop-blur-sm overflow-hidden bg-white/10 p-2 md:p-4
                       h-[400px] md:h-[500px]"
          >
            <GameChoices
              onChoiceSelect={handleChoiceSelect}
              isPlaying={isPlaying || battleState !== 'idle'}
              handleRandomChoice={handleRandomChoice}
            />
          </div>

          <div
            className="rounded-2xl shadow-md backdrop-blur-sm overflow-hidden bg-white/10 p-2 md:p-4 mt-4 md:mt-0
                      h-[400px] md:h-[500px] max-w-md mx-auto"
          >
            <GameScoreboard />
          </div>
        </div>

        {battleState === 'idle' && resultText && (
          <div className="text-2xl font-bold text-yellow-300 mt-6 text-center">{resultText}</div>
        )}
      </div>

      {(battleState === 'battling' || battleState === 'showResult') &&
        playerChoiceName &&
        computerChoiceName && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/40 overflow-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              {battleState === 'battling' && (
                <>
                  <img
                    src={`/images/${playerChoiceName}.png`}
                    alt={`Player ${playerChoiceName}`}
                    className="h-32 w-32 sm:h-40 sm:w-40 object-contain animate-battle-left"
                  />
                  <img
                    src={`/images/${computerChoiceName}.png`}
                    alt={`Computer ${computerChoiceName}`}
                    className="h-32 w-32 sm:h-40 sm:w-40 object-contain animate-battle-right"
                  />
                </>
              )}

              {battleState === 'showResult' && (
                <div
                  className="text-white font-extrabold text-4xl sm:text-6xl drop-shadow-lg 
                            animate-zoom-in select-none text-center mt-4"
                  >
                   {resultText}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default GamePage;
