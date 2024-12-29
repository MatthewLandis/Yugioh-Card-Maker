using YugiohCardMaker.Server.Databases;
using YugiohCardMaker.Server.Models;
using Dapper;

namespace YugiohCardMaker.Server.Services
{
    public class CardService : ICardService
    {
        private readonly ILogger<CardService> _logger;
        private readonly ISql _sql;
        public CardService(
            ILogger<CardService> logger,
            ISql sql
        ) 
        {
            _logger = logger;
            _sql = sql;
        }

        public async Task<List<CardModel>?> GetCards()
        {
            try
            {
                using (var con = _sql.Cards)
                {
                    var query = "SELECT * FROM Cards";

                    var result = (await con.QueryAsync<CardModel>(query)).ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetCards");
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
