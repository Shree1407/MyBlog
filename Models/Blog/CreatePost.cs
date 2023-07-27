namespace MyBlog.Models.Blog
{
    public class CreatePost
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int AuthorId { get; set; }
        public IFormFile? Image { get; set; }
    }
}
