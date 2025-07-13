using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using System.Security.Claims;

namespace GameApi.Routes;

public static class AuthRoute
{
    public static void MapAuthRoutes(this IEndpointRouteBuilder app)
    {
        //Google login: redirect to Google
        app.MapGet("/login", (HttpContext context, IConfiguration config) =>
        {
            var redirectUri = config["RedirectSettings:RedirectUri"];
            var props = new AuthenticationProperties { RedirectUri = redirectUri };
            return Results.Challenge(props, new[] { GoogleDefaults.AuthenticationScheme });
        });

        app.MapGet("/logout", async (HttpContext context) =>
        {
            await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Results.Ok();
        });

        //Get current authenticated user info
        app.MapGet("/me", (HttpContext context) =>
        {
            if (!context.User.Identity?.IsAuthenticated ?? true)
                return Results.Unauthorized();

            var name = context.User.Identity!.Name;
            var email = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var userId = context.User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

            return Results.Ok(new { Name = name, Email = email, UserId = userId });
        });
    }
}
