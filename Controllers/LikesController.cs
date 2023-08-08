using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Models.Blog;
using MyBlog.Models;
using MyBlog.Models.Login;
using Microsoft.EntityFrameworkCore;
using MyBlog.Models.Services;
using Microsoft.AspNetCore.Authorization;

namespace MyBlog.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        //private readonly ApplicationDbContext _context;
        //public LikesController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}
        private readonly ILikesData _likeData;
        public LikesController(ILikesData likeData)
        {
            _likeData = likeData;
        }
        [HttpPost]
        public async Task<IActionResult> Likes(Like _like)
        {
            if (_likeData.postLike(_like))
            {
                return Ok(new { Message = "Successful" });
            }
            return NoContent();

        }
    }
}
