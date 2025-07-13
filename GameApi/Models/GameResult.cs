namespace GameApi.Models
{
    public class GameResult
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public Choice PlayerChoice { get; set; }
        public Choice ComputerChoice { get; set; }
        public string Results { get; set; } = string.Empty;
        public DateTime PlayedAt { get; set; }
    }
}
