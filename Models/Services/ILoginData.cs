using MyBlog.Models.Login;

namespace MyBlog.Models.Services
{
    public interface ILoginData
    {
        UserMaster AuthenticateUser(User user);
    }
}
