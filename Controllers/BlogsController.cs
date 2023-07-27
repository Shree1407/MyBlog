﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlog.Models;
using MyBlog.Models.Blog;
using System.Runtime.CompilerServices;

namespace MyBlog.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BlogsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetBlogs")]
        public IEnumerable<Post> Get()
        {
           return  _context.Posts.OrderByDescending(u => u.Id).ToArray();

        }
        [HttpGet]
        [Route("GetByIdBlogs/{id}")]
        public IEnumerable<Post> ByIdBlogs(int id)
        {
            return _context.Posts.Where(a => a.AuthorId == id).OrderByDescending(u => u.Id).ToArray();

        }
    }
}
