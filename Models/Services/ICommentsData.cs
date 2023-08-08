using Microsoft.AspNetCore.Mvc;
using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public interface ICommentsData
    {
        IEnumerable<GetComments> GetComments(int id);
        GetComments PostComments(Comment _comment);
    }
}
