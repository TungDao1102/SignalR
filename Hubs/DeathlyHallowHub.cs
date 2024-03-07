using Microsoft.AspNetCore.SignalR;
using SignalR.Utilities;

namespace SignalR.Hubs
{
    public class DeathlyHallowHub : Hub
    {
        public Dictionary<string, int> GetRacePoint()
        {
            return Constant.DeathlyHallowRace;
        }
    }
}
