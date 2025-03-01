using YugiohCardMaker.Server.Services;
using YugiohCardMaker.Server.Databases;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISql, Sql>();

builder.Services.Configure<YugiohCardMaker.Server.Settings>(builder.Configuration);

builder.Services.AddCors(static options =>
{
    options.AddPolicy("AllowAngularApp", static policy =>
    {
        _ = policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

WebApplication app = builder.Build();

app.UseCors("AllowAngularApp");

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
