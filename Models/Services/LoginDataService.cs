using MyBlog.Models.Login;

namespace MyBlog.Models.Services
{
    public class LoginDataService: ILoginData
    {
        private readonly IApplicationDbContext _context;
        public LoginDataService(IApplicationDbContext context)
        {
            _context = context;
        }
        public UserMaster AuthenticateUser(User login)
        {
            var _userMaster = _context.UserMasters.FirstOrDefault(u =>
                            Convert.ToString(u.Email).ToLower() == Convert.ToString(login.Username).ToLower() &&
                            u.Password == login.Password
                            );
            if (_userMaster != null)
            {
                return _userMaster;
            }

            return _userMaster;
        }
    }
}
