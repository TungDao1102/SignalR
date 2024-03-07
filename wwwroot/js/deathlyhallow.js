// create connection, url from program.cs
var connectionUserDeathlyHallow = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyhallow").build();
// LongPolling, ServerSentEvents. default is websocket

var cloakSpan = document.getElementById("cloakCounter");
var wandSpan = document.getElementById("wandCounter");
var stoneSpan = document.getElementById("stoneCounter");

// connect to hub then retrieve notification from hub
connectionUserDeathlyHallow.on("updateDeathlyHallowCount", (cloak, wand, stone) => {   
    cloakSpan.innerText = cloak.toString();
    wandSpan.innerText = wand.toString();
    stoneSpan.innerText = stone.toString();
});

// start connection

function fulfilled() { // fulfilled = complete
    // do something on start
    console.log("connected to deathly hallow hub");
    connectionUserDeathlyHallow.invoke("GetRacePoint").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        wandSpan.innerText = raceCounter.wand.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
    });

}

function rejected() {
    // reject log
}

connectionUserDeathlyHallow.start().then(fulfilled, rejected);