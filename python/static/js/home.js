let port = 80;
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io(`ws://${window.location.host}:${port}/`);

window.addEventListener("load", onLoad);
window.addEventListener("resize", reSize);

function onLoad() {
    // get_login_data();

    get_dht11_data();
    setInterval(get_dht11_data, 10000);

    set_now_date_time();
    setInterval(set_now_date_time, 1000);

    setup_google_charts();
}

function reSize() {
    setup_google_charts();
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

function get_dht11_data() {
    socket.emit('dht11_now_data', "data");
}

socket.on('dht11_now_data', data=> {
    console.log(data);
    console.log("temp:", data.temp, "\u00B0C");
    console.log("hum:", data.hum, "%");
    if(data.temp != null && data.hum != null) {
        nowTempData.innerText = `${data.temp}\u00B0C`;
        nowHumData.innerText  = `${data.hum}%`;
    }
    // socket.emit('dht11_now_data', "data");
})
