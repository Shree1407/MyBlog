using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public interface IPostFormData
    {
        void PostsData(Post _post);
        bool DeletePostData(int id);
        bool UpdatedPost(Post createpost);

    }
}
