namespace MyBlog.Models.Blog
{
    public class GetComments
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public int PostId { get; set; }
        public int AuthorId { get; set; }
        public string? AuthorName { get; set; }
        public DateTime DatePublished { get; set; }

    }
}
