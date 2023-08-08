using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using MyBlog.Models;
using MyBlog.Models.Blog;
using MyBlog.Models.Services;
using System.Runtime.CompilerServices;

namespace MyBlog.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        //private readonly ApplicationDbContext _context;
        //public BlogsController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}
        private readonly IBlogData _blogData;
        public BlogsController(IBlogData blogData)
        {
            _blogData = blogData;
        }
        [HttpGet]

        [Route("GetBlogs")]
        public IEnumerable<BlogData> Get()
        {

            var posts = _blogData.GetBlogs();
            return posts.OrderByDescending(u => u.Id).ToArray();

        }
        [HttpGet]
        [Route("GetByIdBlogs/{id}")]
        public IEnumerable<BlogData> ByIdBlogs(int id)
        {
            var posts = _blogData.GetBlogsByid(id);
            return posts.OrderByDescending(u => u.Id).ToArray();

        }
    }
}
