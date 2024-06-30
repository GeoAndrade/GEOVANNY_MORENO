using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApiDotNetCore.DTOs.SecurityDTOs;
using WebApiDotNetCore.Entities;
using WebApiDotNetCore.Services;

namespace WebApiDotNetCore.Controllers
{
    [ApiController]
    [Route("api/Security")]
    public class SecurityController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<User> signInManager;
        private readonly HashService hashService;
        private readonly IDataProtector dataProtector;
        private string JWTKey { get; set; }

        public SecurityController(UserManager<User> userManager,
                                 IConfiguration configuration,
                                 SignInManager<User> signInManager,
                                 IDataProtectionProvider dataProtectionProvider,
                                 HashService hashService)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.hashService = hashService;
            JWTKey = configuration["JWTKey"];
            dataProtector = dataProtectionProvider.CreateProtector(JWTKey);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<AuthenticationResponse>> Registrar(RegisterInfo registerInfo) =>
            (await userManager.CreateAsync(new User { UserName = registerInfo.Username, Email = registerInfo.Email }, registerInfo.Password)).Succeeded ?
            await CreateToken(registerInfo.Username) :
            BadRequest("Ocurrio un error al registrar usuario");

        [HttpGet("RenewToken")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<AuthenticationResponse>> Renovar()
        {
            var emailClaim = HttpContext.User.Claims.Where(claim => claim.Type == "email").FirstOrDefault();
            var email = emailClaim.Value;
            return await CreateToken(email);
        }

        //Generar Hash y Token
        [HttpPost("Login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(DTOs.SecurityDTOs.UserLoginInfo userLoginInfo)
        {
            try
            {
                var result = await signInManager.PasswordSignInAsync(userLoginInfo.Username,
                                                                    userLoginInfo.Password,
                                                                    isPersistent: false,
                                                                    lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    var tokenResponse = await CreateToken(userLoginInfo.Username);
                    return Ok(tokenResponse);
                }
                else
                {
                    return BadRequest("Login incorrecto");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error del servidor: " + ex.Message);
            }
        }

        [HttpGet("ValidateToken")]
        public async Task<ActionResult> ValidateTokenUser(string token)
        {
            try
            {
                var validateToken = await ValidateToken(token);
                if (validateToken is null)
                {
                    return BadRequest("Token no valido");
                }
                return Ok(validateToken);
            }
            catch (Exception)
            {
                return BadRequest("Token no valido");
            }
        }

        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword(DTOs.SecurityDTOs.UserLoginInfo credencialesUsuario)
        {
            User user = await userManager.FindByNameAsync(credencialesUsuario.Username);
            if (user == null)
            {
                return NotFound();
            }
            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, credencialesUsuario.Password);
            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest("Ocurrio un error al camabiar su contraseña");
            }
            return Ok("Contraseña actualizada con exito!");
        }

        private async Task<AuthenticationResponse> CreateToken(string username)
        {
            var claims = new List<Claim>()
            {
                new("email", username),
            };

            var user = await userManager.FindByNameAsync(username);
            var claimsDB = await userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddYears(1);

            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                Expiracion = expiration,
                UserName = user.UserName
            };
        }

        private Task<string> ValidateToken(string token)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(JWTKey);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "email").Value;

                return Task.FromResult(userId);
            }
            catch
            {
                return null;
            }
        }

    }
}