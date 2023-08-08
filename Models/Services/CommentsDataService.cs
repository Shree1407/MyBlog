using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlog.Models.Blog;

namespace MyBlog.Models.Services
{
    public class CommentsDataService : ICommentsData
    {
        private readonly ApplicationDbContext _context;
        private readonly IApplicationDbContext _context_Inetr;
        public CommentsDataService(ApplicationDbContext context, IApplicationDbContext context_Inetr)
        {
            _context = context;
            _context_Inetr = context_Inetr;
        }
        public IEnumerable<GetComments> GetComments(int id)
        {
            return (from comm in _context_Inetr.Comments
                    where comm.PostId == id
                    select new GetComments
                    {
                        AuthorId = comm.AuthorId,
                        AuthorName = _context_Inetr.UserMasters.Where(u => u.Id == comm.AuthorId).FirstOrDefault().Name,
                        Id = comm.Id,
                        DatePublished = comm.DatePublished,
                        PostId = comm.PostId,
                        Text = comm.Text
                    }).ToArray();
        }

        public GetComments PostComments(Comment _comment)
        {
            var comment = new Comment
            {
                PostId = _comment.PostId,
                AuthorId = _comment.AuthorId,
                DatePublished = DateTime.Now,
                Text = _comment.Text,
            };
            _context.Comments.Add(comment);
            _context.SaveChanges();
            var postdata = _context.Posts.FirstOrDefault(a => a.Id == _comment.PostId);
            if (postdata != null)
            {
                postdata.numComments = postdata.numComments + 1;
                _context.Entry(postdata).State = EntityState.Modified;
                _context.SaveChanges();
            }

            return (from comm in _context.Comments
                    where comm.PostId == _comment.PostId && comm.AuthorId == _comment.AuthorId
                    select new GetComments
                    {
                        AuthorId = comm.AuthorId,
                        AuthorName = _context.UserMasters.Where(u => u.Id == comm.AuthorId).FirstOrDefault().Name,
                        Id = comm.Id,
                        DatePublished = comm.DatePublished,
                        PostId = comm.PostId,
                        Text = comm.Text
                    }).OrderByDescending(u => u.Id).FirstOrDefault();
        }

    }
}
