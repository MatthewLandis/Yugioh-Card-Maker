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

            using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;
            User? existingUser = await con.QuerySingleOrDefaultAsync<User>(
                "Select * from Users where Email = @Email",
                new { request.Email });
            if (existingUser != null)
            {
                return 0;
            }

            int result = await con.QuerySingleOrDefaultAsync<int>(
                "Insert into Users (Username, Email, Password) VALUES (@Username, @Email, @Password); select SCOPE_IDENTITY()",
                request);
            return result;
        }

        public async Task<User?> LoginUser(User request)
        {
            using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;
            User? user = await con.QuerySingleOrDefaultAsync<User>(
                "SELECT ID, Username FROM Users WHERE Email = @Email AND Password = @Password",
                request);
            return user ?? null;
        }

        public async Task<int> AddCardToDeck(string cardImage)
        {
            using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;
            int rowsAffected = await con.ExecuteAsync(
                "INSERT INTO Deck (CardImage) VALUES (@CardImage)",
                new { CardImage = cardImage }
            );
            return rowsAffected;
        }
        /**********************************************************************************************\
        |                                      Function Breakdown                                      |
        |**********************************************************************************************|
        |                                                                                              |
        |  1. Function Definition:                                                                     |
        |                                                                                              |
        |      public async Task<int> AddCardToDeck(string cardImage)                                  |
        |                                                                                              |
        |      - public → This means the function can be used in other parts of your program.          |
        |      - async → This means the function runs in the background without stopping other tasks.  |
        |      - Task<int> → This means the function will eventually return a number (int).            |
        |      - AddCardToDeck(string cardImage) → This function needs one piece of information:       |
        |        a string representing the image of the card.                                          |
        |                                                                                              |
        |**********************************************************************************************|
        |                                                                                              |
        |  2. Open a Connection to the Database:                                                       |
        |                                                                                              |
        |      using Microsoft.Data.SqlClient.SqlConnection con = _sql.YCM;                            |
        |                                                                                              |
        |      - This creates a connection to the database.                                            |
        |      - _sql.YCM → This is where the database connection details are stored.                  |
        |                                                                                              |
        |**********************************************************************************************|
        |                                                                                              |
        |  3. Insert the Card Image into the Database:                                                 |
        |                                                                                              |
        |      int rowsAffected = await con.ExecuteAsync(                                              |
        |          "INSERT INTO Deck (CardImage) VALUES (@CardImage)",                                 |
        |          new { CardImage = cardImage }                                                       |
        |      );                                                                                      |
        |                                                                                              |
        |      - ExecuteAsync → This tells the database to run a command.                              |
        |      - SQL Command: INSERT INTO Deck (CardImage) VALUES (@CardImage)                         |
        |                                                                                              |
        |          - INSERT INTO Deck → We are adding something new into the Deck table.               |
        |          - (CardImage) → We are storing information in the CardImage column.                 |
        |          - VALUES (@CardImage) → We are placing a value (the card image filename)            |
        |            into that column.                                                                 |
        |                                                                                              |
        |      - @CardImage is a placeholder (a temporary name).                                       |
        |      - new { CardImage = cardImage } → This gives the real value of cardImage                |
        |        to the placeholder.                                                                   |
        |      - Example: If cardImage = "king_of_hearts.jpg", the final command is:                   |
        |          INSERT INTO Deck (CardImage) VALUES ('king_of_hearts.jpg')                          |
        |                                                                                              |
        |**********************************************************************************************|
        |                                                                                              |
        |  4. Return the Result:                                                                       |
        |                                                                                              |
        |      return rowsAffected;                                                                    |
        |                                                                                              |
        |      - Sends back a number to tell us if the operation worked.                               |
        |      - If 1, it means the card was saved successfully.                                       |
        |      - If 0, it means nothing was added (something failed).                                  |
        |                                                                                              |
        \**********************************************************************************************/

    }
}
