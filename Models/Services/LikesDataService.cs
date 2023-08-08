using Microsoft.EntityFrameworkCore;
using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public class LikesDataService : ILikesData
    {
        private readonly ApplicationDbContext _context;
        public LikesDataService(ApplicationDbContext context)
        {
            _context = context;
        }
        public bool postLike(Like _like)
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
                if (postdata != null)
                {
                    postdata.numLikes = postdata.numLikes + 1;
                    _context.Entry(postdata).State = EntityState.Modified;
                    _context.SaveChanges();
                }
                return true;
            }
            return false;
        }
    }
}
