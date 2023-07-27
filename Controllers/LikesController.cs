using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Models.Blog;
using MyBlog.Models;
using MyBlog.Models.Login;
using Microsoft.EntityFrameworkCore;

namespace MyBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LikesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult Likes(Like _like)
        {
            var liekdata = _context.Likes.FirstOrDefault(a => a.PostID == _like.PostID && a.AuthorId == _like.AuthorId);
            if (liekdata == null)
            {
                var like = new Like
                {
                    AuthorId = _like.AuthorId,
                    PostID = _like.PostID
                };

                _context.Likes.Add(like);
                _context.SaveChanges();

                var postdata = _context.Posts.FirstOrDefault(a => a.Id == _like.PostID);
                if (postdata == null)
                {
                    postdata.numLikes = postdata.numLikes + 1;
                    _context.Entry(postdata).State = EntityState.Modified; 
                    _context.SaveChanges();
                }
                return Ok();
            }
            return NoContent();

        }
    }
}
