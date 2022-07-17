let list_circle_1 = new Array;
let list_circle_2 = new Array;
let list_map = new Array;

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
    let data = google.visualization.arrayToDataTable([
        ['Seconds', 'Template', 'Humidity'],
        ['0',   1000,      400],
        ['12',  1170,      460],
        ['24',   660,      110],
        ['36',   530,      540],
        ['48',   750,      324],
        ['60',   570,      650],
    ]);

    let options = {
        title: 'Template & Humidity chart',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    let chart = new google.visualization.LineChart(DHT11Chart);

    chart.draw(data, options);
}

function drawRegionsMap() {
    for(let i = 0; i < 7; i ++) {
        let x =  Math.floor(Math.random() * 800) + 1
        list_map.push(x);
    }
    let data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany',        list_map[0]],
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
        ['熱水器',    list_circle_1[4]]
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
        ['熱水器',    list_circle_2[4]]
    ]);

    let options = {
        title: '二樓用電量',
        is3D: true,
    };

    let chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

    chart2.draw(data, options);
}


