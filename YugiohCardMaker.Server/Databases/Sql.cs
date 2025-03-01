using Microsoft.Extensions.Options;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Hosting.Server;
using System.Diagnostics.Metrics;

namespace YugiohCardMaker.Server.Databases
{
    public class Sql : ISql
    {
        private readonly string _connectionString;

        public Sql(IOptions<Settings> settings)
        {
            _connectionString = settings!.Value.Users;
        }
        public SqlConnection Users => new(_connectionString);
    }
}

Server = localhost\SQLEXPRESS; Database = master; Trusted_Connection = True; 
C:\Program Files\Microsoft SQL Server\160\Setup Bootstrap\Log\20250301_133821 
C:\SQL2022\Express_ENU 
C:\Program Files\Microsoft SQL Server\160\SSEI\Resources