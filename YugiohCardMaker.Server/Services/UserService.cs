using YugiohCardMaker.Server.Models;
using YugiohCardMaker.Server.Databases;
using Dapper;

namespace YugiohCardMaker.Server.Services
{
    public class UserService(ISql sql) : IUserService
    {
        private readonly ISql _sql = sql;

        public async Task<bool> RegisterUser(User request)
        {
            try
            {
                using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;
                User? existingUser = await con.QuerySingleOrDefaultAsync<User>("Select * from Users where Email = @Email", new { request.Email });
                if (existingUser != null)
                {
                    return false;
                }

                int result = await con.ExecuteAsync("Insert into Users (Username, Email, Password) VALUES (@Username, @Email, @Password)", request);
                return result != 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return false;
        }
    }
}
