using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Services
{
    public interface IUserService
    {
        Task<bool> RegisterUser(User request);
    }
}
