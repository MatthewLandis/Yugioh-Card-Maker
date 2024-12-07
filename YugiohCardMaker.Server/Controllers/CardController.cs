using Microsoft.AspNetCore.Mvc;
using YugiohCardMaker.Server.Services;

namespace YugiohCardMaker.Server.Controllers
{
    [ApiController]
    [Route("api/Card")]
    public class CardController : ControllerBase
    { 
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet("DarkMagician")]
        public async Task<IActionResult> GetDarkMagician()
        { 
            var darkMagician = await _cardService.GetDarkMagician();

            return darkMagician != null ? Ok(darkMagician) : NotFound("Dark Magician is in your graveyard");
        }



        [HttpGet("Dark")]
        public async Task<IActionResult> GetDark()
        {
            var dark = await _cardService.GetDark();

            return dark != null ? Ok(dark) : NotFound("poopshoot");
        }
    }
}
