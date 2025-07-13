import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios';

interface GameScore {
  playerChoiceName: string;
  computerChoiceName: string;
  results: string;
}

const GameScoreboard = () => {
  const queryClient = useQueryClient();

  const { data: scores } = useQuery<GameScore[]>({
    queryKey: ['scores'],
    queryFn: () => axios.get('/scoreboard').then((res) => res.data),
  });

  const { mutate: resetScoreboard } = useMutation({
    mutationFn: () => axios.post('/scoreboard/reset'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scores'] }),
  });

  return (
    <div className="w-full">
      <h2 className="text-center text-xl md:text-2xl font-extrabold mb-4 md:mb-6 text-purple-700">
        Player Scoreboard
      </h2>

      {scores?.length ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white opacity-60 mb-4 md:mb-6 max-w-md mx-auto">
          <table className="w-full text-left border-collapse text-[10px] md:text-xs">
            <thead className="bg-purple-200 text-purple-900 text-[10px] md:text-xs">
              <tr>
                <th className="p-1 border border-gray-300 font-semibold">PLAYER</th>
                <th className="p-1 border border-gray-300 font-semibold">COMPUTER</th>
                <th className="p-1 border border-gray-300 font-semibold">RESULT</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-50'} hover:bg-purple-100`}
                >
                  <td className="p-1 border border-gray-300">{score.playerChoiceName}</td>
                  <td className="p-1 border border-gray-300">{score.computerChoiceName}</td>
                  <td className="p-1 border border-gray-300 text-purple-700 font-semibold">{score.results}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mb-4 md:mb-6">No scores yet. Play some rounds!</div>
      )}

      <button
        onClick={() => resetScoreboard()}
        className="w-full py-2 md:py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition text-sm md:text-base"
      >
        Reset Scoreboard
      </button>
    </div>
  );
};

export default GameScoreboard;
