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
    let data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700]
    ]);

    let options = {};

    let chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

function circle_drawChart() {
    let data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     20],
        ['Eat',      20],
        ['Commute',  20],
        ['Watch TV', 20],
        ['Sleep',    20]
    ]);

    let options = {
        title: 'My Daily Activities'
    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

function circle2_drawChart() {
    let data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     1],
        ['Eat',      1],
        ['Commute',  1],
        ['Watch TV', 1],
        ['Sleep',    1]
    ]);

    let options = {
        title: 'My Daily Activities'
    };

    let chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

    chart2.draw(data, options);
}


