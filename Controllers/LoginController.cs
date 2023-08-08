using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyBlog.Models;
using MyBlog.Models.Login;
using MyBlog.Models.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyBlog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILoginData _loginData;

        public LoginController(IConfiguration config, ILoginData loginData)
        {
            _config = config;
            _loginData = loginData;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            var user = _loginData.AuthenticateUser(login);

            if (user != null)
            {
                var jwtToken = GenerateToken(user.Email);
                response = Ok(new
                {
                    token = jwtToken,
                    user
                });
            }

            return response;
        }
        private string GenerateToken(string userId)
        {
            var _secretKey = "your_secret_key_Shree_Kant_Kolekar";
            string _issuer = "http://localhost:5143";
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, userId)
        };

            var token = new JwtSecurityToken(
                _issuer,
                _issuer,
                claims,
                expires: DateTime.Now.AddDays(10),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}