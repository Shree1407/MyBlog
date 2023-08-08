using Microsoft.EntityFrameworkCore;
using MyBlog.Models.Blog;
using MyBlog.Models.Login;

namespace MyBlog.Models.Services
{
    public interface IApplicationDbContext
    {
        public DbSet<UserMaster> UserMasters { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }

    }
}
