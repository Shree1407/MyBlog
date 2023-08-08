using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Models.Blog;
using MyBlog.Models;
using MyBlog.Models.Login;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using MyBlog.Models.Services;
using Microsoft.AspNetCore.Authorization;

namespace MyBlog.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class PostFormController : ControllerBase
    {
        //private readonly ApplicationDbContext _context;
        //public PostFormController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}
        private readonly IPostFormData _formData;
        public PostFormController(IPostFormData formData)
        {
            _formData = formData;
        }

        [HttpPost]
        [Route("PostFormData")]
        public async Task<IActionResult> PostForm([FromForm] CreatePost createpost)
        {

            var _post = new Post
            {
                Title = createpost.Title,
                Description = createpost.Description,
                AuthorId = createpost.AuthorId,
                DatePublished = DateTime.Now,
                numComments = 0,
                numLikes = 0,
            };
            if (createpost.Image != null)
            {
                var imagePath = await UploadImage(createpost.Image);
                _post.ImagePath = imagePath;
            }
            _formData.PostsData(_post);
            return Ok(new { Message = "successful post created" });
        }
        [HttpDelete]
        [Route("DeletePost/{id}")]
        public IActionResult DeletePostForm(int id)
        {
            if (_formData.DeletePostData(id))
            {
                return Ok(new { Message = "Deleted successful" });
            }
            return NoContent();
        }
        [HttpPatch]
        public IActionResult UpdatedPostForm([FromBody] Post createpost)
        {
            if (_formData.UpdatedPost(createpost))
            {
                return Ok(new { Message = "Updated successful" });
            }
            return BadRequest();
        }

        private async Task<string> UploadImage(IFormFile image)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return "/uploads/" + uniqueFileName;
        }
    }
}
