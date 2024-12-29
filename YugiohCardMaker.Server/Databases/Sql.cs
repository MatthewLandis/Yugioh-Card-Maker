using Microsoft.Extensions.Options;
using Microsoft.Data.SqlClient;

namespace YugiohCardMaker.Server.Databases
{
    public class Sql : ISql
    {
        private readonly string _connectionString;

        public Sql(IOptions<Settings> settings)
        {
            _connectionString = settings!.Value.Cards;
        }

        public SqlConnection Cards => new(_connectionString);
    }
}
