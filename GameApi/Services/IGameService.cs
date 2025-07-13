using GameApi.DTO;
using GameApi.Models;

namespace GameApi.Services
{
    public interface IGameService
    {
        List<ChoiceDto> GetAllChoices();
        Task<ChoiceDto> GetRandomChoiceAsync();
        Task<GameResultDto> PlayAsync(int playerChoiceId, string userId);
        Task<List<GameResultDto>> GetScoreboardAsync(string userId);
        Task ResetScoreboardAsync(string userId);
    }
}
