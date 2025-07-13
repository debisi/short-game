using GameApi.DTO;
using GameApi.Services;
using System.Security.Claims;

namespace GameApi.Routes
{
    public static class GameRoute
    {
        public static void MapGameRoutes(this IEndpointRouteBuilder routes)
        {
            routes.MapGet("/choices", (IGameService gameService) =>
            {
                var choices = gameService.GetAllChoices();
                return Results.Ok(choices);
            });

            routes.MapGet("/choice", async (IGameService gameService) =>
            {
                var choice = await gameService.GetRandomChoiceAsync();
                return Results.Ok(choice);
            });

            routes.MapPost("/play", async (GameRequest request, IGameService gameService, HttpContext httpContext) =>
            {
                if (!httpContext.User.Identity!.IsAuthenticated)
                    return Results.Unauthorized();

                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                var result = await gameService.PlayAsync(request.PlayerChoiceId, userId);
                return result != null ? Results.Ok(result) : Results.BadRequest("Invalid player choice.");
            }).RequireAuthorization();

            routes.MapGet("/scoreboard", async (IGameService gameService, HttpContext httpContext) =>
            {
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                var result = await gameService.GetScoreboardAsync(userId);
                return Results.Ok(result);
            }).RequireAuthorization();

            routes.MapPost("/scoreboard/reset", async (IGameService gameService, HttpContext httpContext) =>
            {
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                await gameService.ResetScoreboardAsync(userId);
                return Results.Ok(new { message = "Scoreboard reset." });
            }).RequireAuthorization();
        }
    }
}
