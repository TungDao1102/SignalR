var connectionHouseGroup = new signalR.HubConnectionBuilder().withUrl("/hubs/housegroup").build();

var lblJoinHouse = document.getElementById("lbl_houseJoined");

var subGriffin = document.getElementById("btn_gryffindor");
var subHuff = document.getElementById("btn_hufflepuff");
var subSly = document.getElementById("btn_slytherin");
var subRaven = document.getElementById("btn_ravenclaw");

var unSubGriffin = document.getElementById("btn_un_gryffindor");
var unSubHuff = document.getElementById("btn_un_hufflepuff");
var unSubSly = document.getElementById("btn_un_slytherin");
var unSubRaven = document.getElementById("btn_un_ravenclaw");

var triggerSubGriffin = document.getElementById("trigger_gryffindor");
var triggerSubHuff = document.getElementById("trigger_hufflepuff");
var triggerSubSly = document.getElementById("trigger_slytherin");
var triggerSubRaven = document.getElementById("trigger_ravenclaw");

subGriffin.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});
subHuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});
subSly.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Slytherin");
    event.preventDefault();
});
subRaven.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});

unSubGriffin.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
});
unSubHuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});
unSubSly.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});
unSubRaven.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});

triggerSubGriffin.addEventListener("click", function (event) {
    connectionHouseGroup.send("NotificationHouse", "Gryffindor");
    event.preventDefault();
});
triggerSubHuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("NotificationHouse", "Hufflepuff");
    event.preventDefault();
});
triggerSubSly.addEventListener("click", function (event) {
    connectionHouseGroup.send("NotificationHouse", "Slytherin");
    event.preventDefault();
});
triggerSubRaven.addEventListener("click", function (event) {
    connectionHouseGroup.send("NotificationHouse", "Ravenclaw");
    event.preventDefault();
});

connectionHouseGroup.on("subscriptionStatus", (strGroupJoined, houseName, hasSubscribed) => {
    lblJoinHouse.innerText = strGroupJoined;

    if (hasSubscribed) {
        switch (houseName) {
            case 'slytherin':
                subSly.style.display = "none";
                unSubSly.style.display = "";
                break;
            case 'gryffindor':
                subGriffin.style.display = "none";
                unSubGriffin.style.display = "";
                break;
            case 'hufflepuff':
                subHuff.style.display = "none";
                unSubHuff.style.display = "";
                break;
            case 'ravenclaw':
                subRaven.style.display = "none";
                unSubRaven.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`Subscribe Successfully ${houseName}`);
    }
    else {
        switch (houseName) {
            case 'slytherin':
                subSly.style.display = "";
                unSubSly.style.display = "none";
                break;
            case 'gryffindor':
                subGriffin.style.display = "";
                unSubGriffin.style.display = "none";
                break;
            case 'hufflepuff':
                subHuff.style.display = "";
                unSubHuff.style.display = "none";
                break;
            case 'ravenclaw':
                subRaven.style.display = "";
                unSubRaven.style.display = "none";
                break;
            default:
                break;
        }
        toastr.warning(`Unsubscribe Successfully ${houseName}`);
    }
});

connectionHouseGroup.on("newMemberAddToHouse", (houseName) => {
    toastr.success(`A member has subscribed successfully ${houseName}`);
});

connectionHouseGroup.on("aMemberRemoveHouse", (houseName) => {
    toastr.warning(`A member has removed successfully ${houseName}`);
});

connectionHouseGroup.on("triggerHouseNotification", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched`);
});

function fulfilled() { // fulfilled = complete
    // do something on start
    console.log("connected to group house hub");
   
}

function rejected() {
    // reject log
}

connectionHouseGroup.start().then(fulfilled, rejected);