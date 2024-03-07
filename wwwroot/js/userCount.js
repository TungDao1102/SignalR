// const { signalR } = require("./signalr");

// create connection, url from program.cs
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

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
    connectionUserCount.send("NewWindowLoaded");
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