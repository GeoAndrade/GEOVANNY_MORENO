using Microsoft.AspNetCore.Identity;
using WebApiDotNetCore.Entities;

namespace WebApiDotNetCore.Helpers
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(UserManager<User> userManager)
        {
            var users = new[]
            {
                new User { UserName = "admin@email.com", Email = "admin@email.com" },
                new User { UserName = "user1@email.com", Email = "user1@email.com" },
                new User { UserName = "user2@email.com", Email = "user2@email.com" }
            };

            foreach (var user in users)
            {
                var existingUser = await userManager.FindByEmailAsync(user.Email);
                if (existingUser == null)
                {
                    var result = await userManager.CreateAsync(user, "Abc123*+");
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            Console.WriteLine($"Error creando usuario {user.UserName}: {error.Description}");
                        }
                    }
                }
            }
        }
    }
}