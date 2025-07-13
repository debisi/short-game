using GameApi.Data;
using GameApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GameApi.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly GameDbContext _dbContext;

        public GameRepository(GameDbContext dbContext) => _dbContext = dbContext;

        public async Task AddResultAsync(GameResult result)
        {
            _dbContext.GameResults.Add(result);
            await _dbContext.SaveChangesAsync();
        }

        public Task<List<GameResult>> GetRecentResultsAsync(string userId, int count = 10)
        {
            return _dbContext.GameResults
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.PlayedAt)
                .Take(count)
                .ToListAsync();
        }

        public async Task ResetResultsAsync(string userId)
        {
            var results = _dbContext.GameResults.Where(r => r.UserId == userId);
            _dbContext.GameResults.RemoveRange(results);
            await _dbContext.SaveChangesAsync();
        }
    }
}
