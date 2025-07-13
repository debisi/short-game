using Microsoft.AspNetCore.Diagnostics;

namespace GameApi.Routes
{
    public static class ErrorRoute
    {
        public static void MapErrorRoute(this IEndpointRouteBuilder routes, IHostEnvironment env)
        {
            routes.Map("/error", (HttpContext httpContext, ILogger<Program> logger) =>
            {
                var exceptionHandlerFeature = httpContext.Features.Get<IExceptionHandlerFeature>();
                var exception = exceptionHandlerFeature?.Error;

                if (exception != null)
                {
                    logger.LogError(exception, "An unhandled exception occurred.");
                }

                var response = new
                {
                    message = "An unexpected error occurred.",
                    detail = env.IsDevelopment() ? exception?.Message : null
                };

                httpContext.Response.StatusCode = 500;
                return Results.Json(response);
            });
        }
    }
}
