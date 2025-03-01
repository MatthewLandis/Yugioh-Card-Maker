using Microsoft.Data.SqlClient;

namespace YugiohCardMaker.Server.Databases
{
    public interface ISql
    {
        SqlConnection YCM { get; }

    }
}
