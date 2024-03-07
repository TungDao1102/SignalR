// const { signalR } = require("./signalr");

// create connection, url from program.cs
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();
// LongPolling, ServerSentEvents

// connect to hub then retrieve notification from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var countViewSpan = document.getElementById("totalViewsCounter");
    countViewSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var countUserSpan = document.getElementById("totalUsersCounter");
    countUserSpan.innerText = value.toString();
});

// call to hub (send notification to hub)
function newWindowLoadedOnClient() {
    //connectionUserCount.invoke("NewWindowLoaded").then((value) => {
    //    console.log(value);
    //});
      connectionUserCount.invoke("NewWindowLoaded", "string").then((value) => {
    console.log(value);
});
    // use send => no return value (void)
    // use invoke => return value
}

// start connection

function fulfilled() { // fulfilled = complete
    // do something on start
    console.log("connected to user hub");
    newWindowLoadedOnClient();

}

function rejected() {
    // reject log
}

connectionUserCount.start().then(fulfilled, rejected);