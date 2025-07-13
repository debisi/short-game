using GameApi.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GameApi.Repositories
{
    public interface IGameRepository
    {
        Task AddResultAsync(GameResult result);
        Task<List<GameResult>> GetRecentResultsAsync(string userId, int count = 10);
        Task ResetResultsAsync(string userId);
    }
}
