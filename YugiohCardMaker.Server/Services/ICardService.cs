using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Services
{
    public interface ICardService
    {
        Task<CardModel?> GetDarkMagician();
    }
}
