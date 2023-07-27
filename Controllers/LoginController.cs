using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyBlog.Models;
using MyBlog.Models.Login;
using System;
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
        private readonly  ApplicationDbContext _applicationDbContext;
       

        public LoginController(IConfiguration config, ApplicationDbContext applicationDbContext)
        {
            _config = config;
            _applicationDbContext = applicationDbContext;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateToken(user);
                response = Ok(new { 
                    token = tokenString,
                    user
                });
            }

            return response;
        }

        private UserMaster AuthenticateUser(User login)
        {
            var _userMaster = _applicationDbContext.UserMasters.FirstOrDefault(u =>
                            Convert.ToString(u.Email).ToLower() == Convert.ToString(login.Username).ToLower() &&
                            u.Password == login.Password
                            );
            if (_userMaster != null)
            {
                return _userMaster;
            }

            return null;
        }

        private string GenerateToken(UserMaster user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}