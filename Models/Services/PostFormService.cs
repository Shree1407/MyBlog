using Microsoft.EntityFrameworkCore;
using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public class PostFormService : IPostFormData
    {
        private readonly ApplicationDbContext _context;
        public PostFormService(ApplicationDbContext context)
        {
            _context = context;
        }
        public bool DeletePostData(int id)
        {
            var postdetails = _context.Posts.Find(id);
            if (postdetails != null)
            {
                _context.Entry(postdetails).State = EntityState.Deleted;
                _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public void PostsData(Post _post)
        {
            _context.Posts.Add(_post);
            _context.SaveChanges();
        }

        public bool UpdatedPost(Post createpost)
        {
            var postdetails = _context.Posts.Find(createpost.Id);
            if (postdetails != null)
            {
                _context.Entry(createpost).State = EntityState.Modified;
                _context.SaveChangesAsync();
                return true;
            }
            return false;
            
        }
    }
}
