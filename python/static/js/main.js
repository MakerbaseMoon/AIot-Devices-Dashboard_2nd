window.addEventListener("load", onLoad);

function onLoad() {
    get_login_data();

    google.charts.load('upcoming', {packages: ['corechart']}).then(initChart);
    setNowDate();
    setNowDHT11Data();

    setInterval(setNowDate,       1000);
    setInterval(setNowDHT11Data, 60000);
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
            window.location.href = `${window.location.origin}/home`;
        } else {
            window.location.href = `${window.location.origin}/login`;
        }
    });
}
