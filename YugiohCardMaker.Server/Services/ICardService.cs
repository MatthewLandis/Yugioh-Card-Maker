using YugiohCardMaker.Server.Models;

namespace YugiohCardMaker.Server.Services
{
    public interface ICardService
    {
        Task<List<CardModel>?> GetCards();
        Task<CardModel2?> GetDark(); 
        //knull is bond to knyltar bind jar barin barren barrin brisket basket brisslt do do dio dio duh ne ne nue (liars bar theme)
    }
}
