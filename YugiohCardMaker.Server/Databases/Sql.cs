using Microsoft.Extensions.Options;
using Microsoft.Data.SqlClient;

namespace YugiohCardMaker.Server.Databases
{
    public class Sql(IOptions<Settings> settings) : ISql
    {
        private readonly string _connectionString = settings!.Value.YCM;

        public SqlConnection YCM => new(_connectionString);
    }
}
