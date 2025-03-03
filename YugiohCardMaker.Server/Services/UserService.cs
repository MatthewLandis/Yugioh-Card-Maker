using YugiohCardMaker.Server.Models;
using YugiohCardMaker.Server.Databases;
using Dapper;

namespace YugiohCardMaker.Server.Services
{
    public class UserService(ISql sql) : IUserService
    {
        private readonly ISql _sql = sql;

        public async Task<int> RegisterUser(User request)
        {
            try
            {
                using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;
                User? existingUser = await con.QuerySingleOrDefaultAsync<User>("Select * from Users where Email = @Email", new { request.Email });
                if (existingUser != null)
                {
                    return 0;
                }

                int result = await con.QuerySingleOrDefaultAsync<int>("Insert into Users (Username, Email, Password) VALUES (@Username, @Email, @Password); select SCOPE_IDENTITY()", request);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return 0;
        }

        public async Task<int> LoginUser(User request)
        {
            using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;
            int? userID = await con.QuerySingleOrDefaultAsync<int>("SELECT ID FROM Users WHERE Email = @Email AND Password = @Password", request);
            return userID != null ? (int)userID : 0;
        }
    }
}
