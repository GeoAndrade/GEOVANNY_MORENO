namespace WebApiDotNetCore.DTOs.SecurityDTOs
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public DateTime Expiracion { get; set; }
        public string UserName { get; set; }
    }
}