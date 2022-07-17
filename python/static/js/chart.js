let list_circle_1 = new Array;
let list_circle_2 = new Array;
let list_map      = new Array;

let dht11_chart_data = new Array;

function setup_google_charts() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(Template_drawChart);

    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(drawRegionsMap);

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(circle_drawChart);
    google.charts.setOnLoadCallback(circle2_drawChart);
}

function Template_drawChart() {
    console.log(dht11_chart_data);
    let data = google.visualization.arrayToDataTable(dht11_chart_data);

    let options = {
        title: 'Template & Humidity chart',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    let chart = new google.visualization.LineChart(DHT11Chart);

    chart.draw(data, options);
}

function get_chart_data() {
    let request = new XMLHttpRequest();
    request.open("POST", `${window.location.origin}/esp32/getdata`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.addEventListener("load", () => {
        let data = JSON.parse(request.responseText);
        console.log(data);
        console.log("minute", data['minute']);
        if(data['minute'] == null) {
            dht11_chart_data = [
                ['Seconds', 'Template', 'Humidity'],
                ['0',   0,     0],
                ['12',  0,     0],
                ['24',  0,     0],
                ['36',  0,     0],
                ['48',  0,     0],
                ['60',  0,     0],
            ]
        } else {
            dht11_chart_data = [['Seconds', 'Template', 'Humidity']];
            for(let i = 0; i < data['temp'].length; i++) {
                let new_array = new Array;
                new_array.push(0 + i * 12);
                new_array.push(data['temp'][i]);
                new_array.push(data['hum'][i]);
                dht11_chart_data.push(new_array);
            }
        }

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(Template_drawChart);
    
    });
}

function drawRegionsMap() {
    for(let i = 0; i < 7; i ++) {
        let x =  Math.floor(Math.random() * 800) + 1
        list_map.push(x);
    }
    let data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany',       list_map[0]],
        ['United States', list_map[1]],
        ['Brazil',        list_map[2]],
        ['Canada',        list_map[3]],
        ['France',        list_map[4]],
        ['RU',            list_map[5]],
        ['TW',            list_map[6]]
    ]);

    let options = {};

    let chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

function circle_drawChart() {
    for(let i = 0; i < 5; i ++) {
        let x =  Math.floor(Math.random() * 100) + 1
        list_circle_1.push(x);
    }

    let data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['電視',     list_circle_1[0]],
        ['冷氣',     list_circle_1[1]],
        ['冰箱',     list_circle_1[2]],
        ['電燈',     list_circle_1[3]],
        ['熱水器',   list_circle_1[4]]
    ]);

    let options = {
        title: '一樓用電量',
        is3D: true,

    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

function circle2_drawChart() {
    for(let i = 0; i < 5; i ++) {
        let x =  Math.floor(Math.random() * 100) + 1
        list_circle_2.push(x);
    }

    let data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['電視',     list_circle_2[0]],
        ['冷氣',     list_circle_2[1]],
        ['冰箱',     list_circle_2[2]],
        ['電燈',     list_circle_2[3]],
        ['熱水器',   list_circle_2[4]]
    ]);

    let options = {
        title: '二樓用電量',
        is3D: true,
    };

    let chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

    chart2.draw(data, options);
}
