using Microsoft.AspNetCore.Mvc;
using YugiohCardMaker.Server.Services;
using YugiohCardMaker.Server.Models;
using Microsoft.Win32;

namespace YugiohCardMaker.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            var success = await _userService.RegisterUser(request);

            if (!success)
            {
                return BadRequest(new { message = "User already exists." });
            }

            return Ok(new { message = "Registration successful!" });
        }
    }
}
