using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Models;
using MyBlog.Models.Login;
using MyBlog.Models.Services;

namespace MyBlog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly IRegistrationData _registrationData;
        public RegistrationController(IRegistrationData context)
        {
            _registrationData = context;
        }

        [HttpPost]
        public IActionResult Registration([FromBody] UserMaster registrationModel)
        {
            // Perform any necessary validation
            var _userdetails = _registrationData.GetUserMasterByEmail(registrationModel.Email);

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
                _registrationData.PostUserMaster(user);
                return Ok(new { Message = "Registration successful" });
            }

            return BadRequest(new { Message = "With Email - " + registrationModel.Email + " user alreday available." });
        }

    }
}
