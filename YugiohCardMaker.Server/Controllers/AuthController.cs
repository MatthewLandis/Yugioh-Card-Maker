using Microsoft.AspNetCore.Mvc;
using YugiohCardMaker.Server.Services;
using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            bool success = await _userService.RegisterUser(request);

            return success ? Ok(new { message = "Registration successful!" }) : BadRequest(new { message = "User already exists." });
        }
    }
}
