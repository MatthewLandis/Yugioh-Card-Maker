using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Services
{
    public class CardService : ICardService
    {
        private readonly ILogger<CardService> _logger;
        public CardService(ILogger<CardService> logger) 
        {
            _logger = logger;
        }

        public async Task<CardModel?> GetDarkMagician()
        {
            try
            {
                var darkMagician = await Task.Run(() =>
                {
                    return new CardModel
                    {
                        Title = "Dark Magician",
                        Level = 7
                    };
                });

                return darkMagician;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetDarkMagician");
            }

            return null;
        }



        public async Task<CardModel2?> GetDark()
        {
            try
            {
                var dark = await Task.Run(() =>
                {
                    return new CardModel2
                    {
                        PendulumScale = 4
                    };
                });

                return dark;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetDark");
            }

            return null;
        }
    }
}
