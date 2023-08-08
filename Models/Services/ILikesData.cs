using Microsoft.AspNetCore.Mvc;
using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public interface ILikesData
    {
        bool postLike(Like _like);
    }
}
