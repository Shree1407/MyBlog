using MyBlog.Models.Login;

namespace MyBlog.Models.Services
{
    public class RegistrationDataService : IRegistrationData
    {
        private readonly ApplicationDbContext _context;

        public RegistrationDataService(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserMaster GetUserMasterByEmail(string Email)
        {
            var userDecatils = _context.UserMasters.FirstOrDefault(a =>
            Convert.ToString(a.Email).ToLower() == Convert.ToString(Email).ToLower()
            );
            return userDecatils;
        }

        public void PostUserMaster(UserMaster userMaster)
        {
            _context.UserMasters.Add(userMaster);
            _context.SaveChanges();
        }
    }
}
