var connectionNotification = new signalR.HubConnectionBuilder().withUrl("/hubs/notificationHub").build();

document.getElementById("sendButton").disable = true;

connectionNotification.on("loadNotification", function (messages, notificationCounter) {
    document.getElementById("messageList").innerHTML = "";
    var counter = document.getElementById("notificationCounter");
    counter.innerHTML = "<span>(" + notificationCounter + ")</span>";
    for (let i = messages.length - 1; i >= 0; i--) {
        var li = document.createElement("li");
        li.textContent = "Notification - " + messages[i];
        document.getElementById("messageList").appendChild(li);
    }
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("notificationInput").value;
    connectionNotification.send("SendMessage", message).then(function () {
        document.getElementById("notification").value = "";
    });
    event.preventDefault();
});


connectionNotification.start().then(function () {
    document.getElementById("sendButton").disable = false;
    connectionNotification.send("LoadMessage");
});