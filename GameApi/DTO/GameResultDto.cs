namespace GameApi.Models
{
    public class GameResultDto
    {
        public int PlayerChoiceId { get; set; }
        public string PlayerChoiceName { get; set; } = string.Empty;
        public int ComputerChoiceId { get; set; }
        public string ComputerChoiceName { get; set; } = string.Empty;
        public string Results { get; set; } = string.Empty;
    }
}
