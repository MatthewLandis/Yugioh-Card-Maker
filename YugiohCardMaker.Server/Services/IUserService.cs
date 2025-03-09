using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Services
{
    public interface IUserService
    {
        Task<int> RegisterUser(User request);
        Task<User?> LoginUser(User request);
        Task<int> AddCardToDeck(string cardImage);
    }
}
