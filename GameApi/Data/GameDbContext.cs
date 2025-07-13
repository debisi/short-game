using GameApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GameApi.Data
{
    public class GameDbContext : DbContext
    {
        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

        public DbSet<GameResult> GameResults { get; set; }
    }
}
