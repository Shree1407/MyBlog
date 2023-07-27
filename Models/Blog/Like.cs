namespace MyBlog.Models.Blog
{
    public class Like
    {
        public int Id { get; set; }
        public int PostID { get; set; }
        public int AuthorId { get; set; }
    }
}
