import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios';

type BattleState = 'idle' | 'battling' | 'showResult';

export const useGameLogic = () => {
  const [choicesState, setChoicesState] = useState({
    playerChoiceName: null as string | null,
    computerChoiceName: null as string | null,
    resultText: null as string | null,
  });

  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [isPlaying, setIsPlaying] = useState(false);

  const queryClient = useQueryClient();

  const playGameMutation = useMutation({
    mutationFn: (choiceId: number) =>
      axios.post('/play', { playerChoiceId: choiceId }).then((res) => res.data),
    onSuccess: (data) => handleBattleSuccess(data),
    onError: () => handleBattleError(),
  });

  const handleBattleSuccess = (data: any) => {
    setChoicesState({
      playerChoiceName: data.playerChoiceName,
      computerChoiceName: data.computerChoiceName,
      resultText: data.results,
    });
    setBattleState('battling');
    setIsPlaying(false);

    queryClient.invalidateQueries({ queryKey: ['scores'] });
  };

  const handleBattleError = () => {
    setChoicesState((prev) => ({ ...prev, resultText: 'Error: Something went wrong!' }));
    setBattleState('showResult');
    setIsPlaying(false);
  };

  const handleChoiceSelect = (choiceId: number) => {
    if (isPlaying || battleState !== 'idle') return;
    setIsPlaying(true);
    setChoicesState({ playerChoiceName: null, computerChoiceName: null, resultText: null });
    playGameMutation.mutate(choiceId);
  };

  const handleRandomChoice = async () => {
    if (isPlaying || battleState !== 'idle') return;
    setIsPlaying(true);
    setChoicesState({ playerChoiceName: null, computerChoiceName: null, resultText: null });

    try {
      const res = await axios.get('/choice');
      const randomChoice = res.data;
      setChoicesState({ playerChoiceName: randomChoice.choiceName, computerChoiceName: null, resultText: null });
      playGameMutation.mutate(randomChoice.choiceId);
    } catch (error) {
      handleBattleError();
    }
  };

  useEffect(() => {
    if (battleState === 'battling') {
      const timer = setTimeout(() => setBattleState('showResult'), 2000);
      return () => clearTimeout(timer);
    } else if (battleState === 'showResult') {
      const timer = setTimeout(() => resetBattleState(), 2000);
      return () => clearTimeout(timer);
    }
  }, [battleState]);

  const resetBattleState = () => {
    setBattleState('idle');
    setChoicesState({ playerChoiceName: null, computerChoiceName: null, resultText: null });
  };

  return {
    choicesState,
    battleState,
    isPlaying,
    handleChoiceSelect,
    handleRandomChoice,
  };
};
