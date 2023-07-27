using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MyBlog.Models.Login;

namespace MyBlog.Models.Blog
{
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AuthorId { get; set; }
        public DateTime DatePublished { get; set; }
        public int numComments { get; set; }
        public int numLikes { get; set; }
        public string? ImagePath { get; set; }
    }
    
}
