using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Services
{
    public interface IUserService
    {
        Task<int> RegisterUser(User request);
    }
}
