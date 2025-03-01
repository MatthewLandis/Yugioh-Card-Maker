using YugiohCardMaker.Server.Models;
using YugiohCardMaker.Server.Databases;
using Dapper;
namespace YugiohCardMaker.Server.Services
{
    public class UserService : IUserService
    {
        private readonly ISql _sql;
        public UserService(
            ISql sql
        )
        {
            _sql = sql;
        }

        public async Task<bool> RegisterUser(RegisterRequest request)
        {
            try
            {
                using (var con = _sql.Users)
                {
                    var existingUser = await con.QuerySingleAsync<RegisterRequest>("Select * from Users where Email = @Email", new { request.Email });
                    if (existingUser != null)
                    {
                        return false;
                    }

                    var result = await con.ExecuteAsync("Insert into Users (Username, Email, Password) VALUES (@Username, @Email, @Password)", request);
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return false;
        }
    }
}
