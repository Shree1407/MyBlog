using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Models.Blog;
using MyBlog.Models;
using MyBlog.Models.Login;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace MyBlog.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PostFormController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PostFormController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
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

            _context.Posts.Add(_post);
            _context.SaveChanges();
            return Ok(new { Message = "Registration successful" });
        }
        [HttpDelete]
        public IActionResult DeletePostForm(int Id)
        {
            var postdetails = _context.Posts.Find(Id);
            if (postdetails != null)
            {
                _context.Entry(postdetails).State = EntityState.Deleted;
                _context.SaveChangesAsync();
            }
            return Ok(new { Message = "Deleted successful" });
        }
        [HttpPatch]
        public IActionResult UpdatedPostForm([FromBody] Post createpost)
        {
            _context.Entry(createpost).State = EntityState.Modified;
            _context.SaveChangesAsync();
            return Ok(new { Message = "Updated successful" });
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
