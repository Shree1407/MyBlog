using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MyBlog.Models.Login;

namespace MyBlog.Models.Blog
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Text { get; set; }
        public int PostId { get; set; }
        public int AuthorId { get; set; }
        public DateTime DatePublished { get; set; }

    }
}
