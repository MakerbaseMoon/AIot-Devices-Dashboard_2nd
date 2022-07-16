let port = 80;
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io(`ws://${window.location.host}:${port}/`);

window.addEventListener("load", onLoad);

function onLoad() {
    // get_login_data();

    // google.charts.load('upcoming', {packages: ['corechart']}).then(initChart);
    // setNowDate();
    // setNowDHT11Data();

    // setInterval(setNowDate,       1000);
    // setInterval(setNowDHT11Data, 60000);
}

function get_login_data() {
    console.log("Get login data");
    let request = new XMLHttpRequest();
    request.open("POST", `${window.location.origin}/login/get`, true);
    // request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.addEventListener("load", () => {
        let text = request.responseText;
        console.log(`data: ${text}`);
        if(text == "OK") {
            if(window.location.pathname != '/home')
                window.location.href = `${window.location.origin}/home`;
        } else {
            if(window.location.pathname != '/login')
                window.location.href = `${window.location.origin}/login`;
        }
    });
}


socket.on('dht11_now_data', data=> {
    console.log(data);
    socket.emit('dht11_now_data', "data");
})
