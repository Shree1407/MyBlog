using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using MyBlog.Models;
using MyBlog.Models.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.\
// For Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllersWithViews();

// JWT Configuration
var jwtSettings = builder.Configuration.GetSection("JwtSettings");

var issuer = "http://localhost:5143";
var audience = "http://localhost:5143";
var secretKey = "your_secret_key_Shree_Kant_Kolekar";
var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = issuer,
            IssuerSigningKey = securityKey
        };
    });
builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
builder.Services.AddScoped<IBlogData, BlogDataService>();
builder.Services.AddScoped<ICommentsData, CommentsDataService>();
builder.Services.AddScoped<ILikesData, LikesDataService>();
builder.Services.AddScoped<ILoginData, LoginDataService>();
builder.Services.AddScoped<IPostFormData, PostFormService>();
builder.Services.AddScoped<IRegistrationData, RegistrationDataService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Configure authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
