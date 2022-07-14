window.addEventListener("load", onLoad);

function onLoad() {
    google.charts.load('upcoming', {packages: ['corechart']}).then(initChart);
    setNowDate();
    setNowDHT11Data();

    setInterval(setNowDate,       1000);
    setInterval(setNowDHT11Data, 60000);
}