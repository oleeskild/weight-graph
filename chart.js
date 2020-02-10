function initChart(data){
    let today = new Date().toISOString().split('T')[0].split('-');
    today[0] = today[0][2] + today[0][3];//Remove first two digits of year
    today = today.join(".");
    let dataToToday = data.filter(x=>x.Dato.split(".").reverse().join(".") <= today);

    var seriesNames = Object.keys(dataToToday[0]).slice(1,5);
    let series = seriesNames.map(x=> ({
        name: x,
        data: dataToToday.map((y, i)=>{ 
            let weight = y[x];
               if(!weight && i>0) {
                    weight = data[i-1][x] || "";
                   dataToToday[i][x] = weight;
               }
               return Number(weight.replace(",","."))
            }
        )
    }));
    var options = {
        chart: {
            type: 'line',
            height: '80%'
        },
        series: series,
        xaxis: {
            categories: dataToToday.map(x=>x.Dato)
        }
    }

    var chart = new ApexCharts(document.querySelector("#graph"), options);

    chart.render();
}
