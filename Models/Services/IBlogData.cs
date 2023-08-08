using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public interface IBlogData
    {
        IEnumerable<BlogData> GetBlogs();
        IEnumerable<BlogData> GetBlogsByid(int id);
    }
}
