using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class NotificationHub : Hub
    {
        public static int notificationCounter = 0;
        public static List<string> messages = new List<string>();

        public async Task SendMessage(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                notificationCounter++;
                messages.Add(message);
                await LoadMessage();
            }
        }

        public async Task LoadMessage()
        {
            await Clients.All.SendAsync("loadNotification", messages, notificationCounter);
        }
    }
}
