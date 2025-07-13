using GameApi.DTO;
using GameApi.Models;
using GameApi.Repositories;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GameApi.Services
{
    public record RandomNumber
    {
        [JsonPropertyName("random_number")]
        public int Value { get; init; }
    }
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<GameService> _logger;
        private readonly string _randomUrl;

        private static readonly Dictionary<Choice, List<Choice>> Winner = new()
        {
            [Choice.rock] = new() { Choice.scissors, Choice.lizard },
            [Choice.paper] = new() { Choice.rock, Choice.spock },
            [Choice.scissors] = new() { Choice.paper, Choice.lizard },
            [Choice.lizard] = new() { Choice.spock, Choice.paper },
            [Choice.spock] = new() { Choice.scissors, Choice.rock }
        };

        public GameService(IGameRepository gameRepository, IHttpClientFactory httpClientFactory, ILogger<GameService> logger, IConfiguration config)
        {
            _gameRepository = gameRepository;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _randomUrl = config["ExternalApis:RandomUrl"]!;
        }

        public List<ChoiceDto> GetAllChoices()
        {
            return Enum.GetValues<Choice>()
                    .Select(c => new ChoiceDto { ChoiceId = (int)c, ChoiceName = c.ToString() })
                    .ToList();
        }

        public async Task<ChoiceDto> GetRandomChoiceAsync()
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                var responseJson = await client.GetStringAsync(_randomUrl);
                var response = JsonSerializer.Deserialize<RandomNumber>(responseJson);
                var index = (Choice)((response!.Value % 5) +1);

                return new ChoiceDto { ChoiceId = (int)index, ChoiceName = index.ToString() };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get random choice from external API.");
                throw;
            }
        }

        public async Task<GameResultDto> PlayAsync(int playerChoiceId, string userId)
        {
            var computer = await GetRandomChoiceAsync();
            var results = playerChoiceId == computer.ChoiceId ? "Tie" : Winner[(Choice)playerChoiceId].Contains((Choice)computer.ChoiceId) ? "You Win!" : "Computer Win";
            var game = new GameResult
            {
                UserId = userId,
                PlayerChoice = (Choice)playerChoiceId,
                ComputerChoice = (Choice)computer.ChoiceId,
                Results = results,
                PlayedAt = DateTime.UtcNow
            };
            await _gameRepository.AddResultAsync(game);
            return new GameResultDto { PlayerChoiceId = playerChoiceId, PlayerChoiceName = ((Choice)playerChoiceId).ToString(), ComputerChoiceId = computer.ChoiceId, ComputerChoiceName = computer.ChoiceName, Results = results };
        }

        public async Task<List<GameResultDto>> GetScoreboardAsync(string userId)
        {
            var results = await _gameRepository.GetRecentResultsAsync(userId);

            return results.Select(r => new GameResultDto
            {
                PlayerChoiceName = ((Choice)r.PlayerChoice).ToString(),
                ComputerChoiceName = ((Choice)r.ComputerChoice).ToString(),
                Results = r.Results
            }).ToList();
        }

        public Task ResetScoreboardAsync(string userId) =>
            _gameRepository.ResetResultsAsync(userId);
    }
}
