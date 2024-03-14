using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupJoined { get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            if(!GroupJoined.Contains(Context.ConnectionId + ":"+ houseName)) {
                GroupJoined.Add(Context.ConnectionId + ":" + houseName);

                string houseList = "";
                foreach(var item in GroupJoined)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        houseList += item.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName.ToLower(), true);
                await Clients.OthersInGroup(houseName).SendAsync("newMemberAddToHouse", houseName);
                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task LeaveHouse(string houseName)
        {
            if (GroupJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupJoined.Remove(Context.ConnectionId + ":" + houseName);

                string houseList = string.Empty;
                foreach (var item in GroupJoined)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        houseList += item.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName.ToLower(), false);
                await Clients.OthersInGroup(houseName).SendAsync("aMemberRemoveHouse", houseName);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task NotificationHouse(string houseName)
        {
            await Clients.Group(houseName).SendAsync("triggerHouseNotification");
        }
    }
}
