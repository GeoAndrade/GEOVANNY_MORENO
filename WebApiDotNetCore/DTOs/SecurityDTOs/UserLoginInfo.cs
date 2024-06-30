using System.ComponentModel.DataAnnotations;

namespace WebApiDotNetCore.DTOs.SecurityDTOs
{
    public class UserLoginInfo
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class RegisterInfo : UserLoginInfo
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}