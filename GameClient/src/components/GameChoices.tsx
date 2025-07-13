import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import '../styles/game-choices-animation.css';

interface Choice {
  choiceId: number;
  choiceName: string;
}

interface GameChoicesProps {
  onChoiceSelect: (choiceId: number) => void;
  isPlaying: boolean;
  handleRandomChoice: () => void;
}

const GameChoices = ({ onChoiceSelect, isPlaying, handleRandomChoice }: GameChoicesProps) => {
  const { data: choices } = useQuery<Choice[]>({
    queryKey: ['choices'],
    queryFn: () => axios.get('/choices').then((res) => res.data),
  });

  return (
    <div className="flex flex-col h-full px-4 py-6">
      <h2
        className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r
          from-yellow-300 via-white to-yellow-300 mb-6 drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] animate-bounce"
      >
        Pick a Choice or Get a Random One!
      </h2>

      <div className="flex-grow flex justify-center items-center flex-wrap gap-8">
        {choices?.map((choice, index) => (
          <button
            key={choice.choiceId}
            onClick={() => !isPlaying && onChoiceSelect(choice.choiceId)}
            disabled={isPlaying}
            className={`w-24 h-24 transition-transform duration-300 ${
              isPlaying ? 'cursor-not-allowed opacity-50' : ''
            } jump`}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <img
              src={`/images/${choice.choiceName}.png`}
              alt={choice.choiceName}
              className="h-full w-full object-contain transition-transform transition-filter duration-300
                hover:brightness-75 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]"
            />
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleRandomChoice}
          disabled={isPlaying}
          className={`w-40 h-20 rounded-[40px] text-white font-bold text-xl bg-gradient-to-r from-blue-500 
            via-green-400 to-blue-500 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110 
            active:scale-105 animate-pulse ${
              isPlaying ? 'cursor-not-allowed opacity-50' : ''
            }`}
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default GameChoices;
