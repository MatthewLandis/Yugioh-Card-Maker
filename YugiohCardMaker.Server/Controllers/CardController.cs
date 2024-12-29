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

        [HttpGet("AllCards")]
        public async Task<IActionResult> GetCards()
        { 
            var cards = await _cardService.GetCards();

            return cards != null ? Ok(cards) : NotFound("All cards are in your graveyard");
        }



        [HttpGet("Dark")]
        public async Task<IActionResult> GetDark()
        {
            var dark = await _cardService.GetDark();

            return dark != null ? Ok(dark) : NotFound("poopshoot");
        }
    }
}
