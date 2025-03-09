using Microsoft.AspNetCore.Mvc;
using YugiohCardMaker.Server.Services;

namespace YugiohCardMaker.Server.Controllers
{
    [Route("api/deck")]
    [ApiController]
    public class DeckController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("saveCard")]
        public async Task<IActionResult> AddCardToDeck([FromBody] string cardImage)
        {
            if (string.IsNullOrWhiteSpace(cardImage))
            {
                return BadRequest("Card image cannot be empty.");
            }

            int rowsAffected = await _userService.AddCardToDeck(cardImage);

            return rowsAffected > 0 ? Ok(new { cardImage }) : BadRequest("Failed to save card.");
        }
        /**********************************************************************************************\
        |                                      Controller Breakdown                                    |
        |**********************************************************************************************|
        |                                                                                              |
        |  1. Function Definition:                                                                     |
        |                                                                                              |
        |      public async Task<IActionResult> AddCardToDeck([FromBody] string cardImage)             |
        |                                                                                              |
        |      - public → This function can be accessed from other parts of the program.               |
        |      - async → This function runs asynchronously (without blocking other tasks).             |
        |      - Task<IActionResult> → Returns an HTTP response result (success or error).             |
        |      - [FromBody] string cardImage → Receives the card image filename from the request body. |
        |                                                                                              |
        |**********************************************************************************************|
        |                                                                                              |
        |  2. Validate Input:                                                                          |
        |                                                                                              |
        |      if (string.IsNullOrWhiteSpace(cardImage))                                               |
        |      {                                                                                       |
        |          return BadRequest("Card image cannot be empty.");                                   |
        |      }                                                                                       |
        |                                                                                              |
        |      - Checks if the `cardImage` input is empty, null, or contains only spaces.              |
        |      - If invalid, returns a **400 Bad Request** with an error message.                      |
        |                                                                                              |
        |**********************************************************************************************|
        |                                                                                              |
        |  3. Call the Service Method to Save the Card Image:                                          |
        |                                                                                              |
        |      int rowsAffected = await _userService.AddCardToDeck(cardImage);                         |
        |                                                                                              |
        |      - Calls the `AddCardToDeck` method from `_userService`.                                 |
        |      - This sends the `cardImage` to the database.                                           |
        |      - Stores the number of rows affected (should be 1 if successful).                       |
        |                                                                                              |
        |**********************************************************************************************|
        |                                                                                              |
        |  4. Return the Result:                                                                       |
        |                                                                                              |
        |      return rowsAffected > 0 ? Ok(new { cardImage }) : BadRequest("Failed to save card.");   |
        |                                                                                              |
        |      - If `rowsAffected > 0` (card was saved), returns **200 OK** with the card image data.  |
        |      - If `rowsAffected == 0` (nothing was saved), returns **400 Bad Request**.              |
        |                                                                                              |
        \**********************************************************************************************/

    }
}