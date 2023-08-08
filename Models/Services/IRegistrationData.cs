using MyBlog.Models.Login;

namespace MyBlog.Models.Services
{
    public interface IRegistrationData
    {
        UserMaster GetUserMasterByEmail(string Email);
        void PostUserMaster(UserMaster userMaster);
    }
}
