using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public class BlogDataService : IBlogData
    {
        private readonly IApplicationDbContext _context;

        public BlogDataService(IApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<BlogData> GetBlogs()
        {
            return (from post in _context.Posts
                    select new BlogData
                    {
                        AuthorId = post.AuthorId,
                        DatePublished = post.DatePublished,
                        Description = post.Description,
                        Id = post.Id,
                        ImagePath = post.ImagePath,
                        numComments = post.numComments,
                        numLikes = post.numLikes,
                        Title = post.Title,
                        AuthorName = _context.UserMasters.FirstOrDefault(u => u.Id == post.AuthorId).Name,
                    }).ToArray();
        }

        public IEnumerable<BlogData> GetBlogsByid(int id)
        {
            string name = _context.UserMasters.FirstOrDefault(u => u.Id == id).Name;
            return (from post in _context.Posts
                    where post.AuthorId == id
                    select new BlogData
                    {
                        AuthorId = post.AuthorId,
                        DatePublished = post.DatePublished,
                        Description = post.Description,
                        Id = post.Id,
                        ImagePath = post.ImagePath,
                        numComments = post.numComments,
                        numLikes = post.numLikes,
                        Title = post.Title,
                        AuthorName = name,
                    }).ToArray();
        }
    }
}
