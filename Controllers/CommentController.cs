using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlog.Models;
using MyBlog.Models.Blog;
using MyBlog.Models.Services;

namespace MyBlog.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        //private readonly ApplicationDbContext _context;
        //public CommentController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}
        private readonly ICommentsData _commentsData;
        public CommentController(ICommentsData commentsData)
        {
            _commentsData = commentsData;
        }

        [HttpGet]
        [Route("GetComment/{id}")]
        public ActionResult<IEnumerable<GetComments>> Get(int id)
        {
            var comments = _commentsData.GetComments(id);
            return Ok(comments.OrderByDescending(u => u.Id));
        }
        [HttpPost]
        [Route("PostComment")]
        public ActionResult<GetComments> post(Comment _comment)
        {
            var comments = _commentsData.PostComments(_comment);

            return Ok(comments);
        }
    }
}
