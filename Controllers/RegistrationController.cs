using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Models;
using MyBlog.Models.Login;

namespace MyBlog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegistrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Registration([FromBody] UserMaster registrationModel)
        {
            // Perform any necessary validation
            var _userdetails = _context.UserMasters.FirstOrDefault(a =>
            Convert.ToString(a.Email).ToLower() == Convert.ToString(registrationModel.Email).ToLower()
            );

            if (_userdetails == null)
            {
                var user = new UserMaster
                {
                    Name = registrationModel.Name,
                    Age = registrationModel.Age,
                    Gender = registrationModel.Gender,
                    Mobile = registrationModel.Mobile,
                    Email = registrationModel.Email,
                    Password = registrationModel.Password,
                };

                _context.UserMasters.Add(user);
                _context.SaveChanges();
                return Ok(new { Message = "Registration successful" });
            }

            return Ok(new { Message = "With Email - " + registrationModel.Email + " user alreday available." });
        }
    }
}
