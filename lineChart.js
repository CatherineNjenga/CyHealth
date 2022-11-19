const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f883bb55f8mshad0a72d85378878p1073efjsn6c3b084254a7',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

fetch('https://covid-193.p.rapidapi.com/history?country=usa&day=2021-06-23', options)
	.then(response => response.json())
	.then(response => {
    // Saving the returned object.
    let series = jsonToSeries(response);
    renderChart(series);
  })
	.catch(err => console.error(err));

function jsonToSeries(data) {
  // Accessing the countries relevant information as an object.
  let countriesData = data.response;
  
  // Saving the cases, deaths and tests number in arrays for easier display on the line graph.
  let time, casesData = [], deathsData = [], testsData = [];
  countriesData.forEach((row) => {
    time = row.time;
    casesData.push({x: time, y: row.cases.total});
    deathsData.push({x: time, y: row.deaths.total});
    testsData.push({x: time, y: row.tests.total});    
  })
  return [
    {name: 'cases', points: casesData},
    {name: 'deaths', points: deathsData},
    {name: 'tests', points: testsData},
  ]
}

function renderChart(series) {
  JSC.chart("chartDiv", {
    debug: true,
    type: 'line',
    legend_visible: false,
    xAxis: {
      crossHair_enabled: true,
      scale: { type: 'time'}
    },
    series: series
  });
}
