const statisticsOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f883bb55f8mshad0a72d85378878p1073efjsn6c3b084254a7',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
};

fetch('https://covid-193.p.rapidapi.com/statistics', statisticsOptions)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    // Creating a table body for the data in the table..
    const tableBody = document.getElementById("countries");

    // // Accessing the countries data from the response of calling fetch function.
    let entries = data.response;
    
    entries.map(entry => {
      // Creating a row in the table.
      const tableRow = document.createElement('tr');

      // Creating columns in the table.
      const countryData = document.createElement('td');
      const newCases = document.createElement('td');
      const activeCases = document.createElement('td');
      const criticalCases = document.createElement('td');
      const recoveredCases = document.createElement('td');
      const totalCases = document.createElement('td');
      const continent = document.createElement('td');
      const deaths = document.createElement('td');
      const population = document.createElement('td');
      const tests = document.createElement('td');
      
      // Inputing the data consumed from the covid19 API in the columns.
      countryData.textContent = entry.country;
      newCases.textContent = entry.cases.new;
      activeCases.textContent = entry.cases.active;
      criticalCases.textContent = entry.cases.critical;
      recoveredCases.textContent = entry.cases.recovered;
      totalCases.textContent = entry.cases.total;
      continent.textContent = entry.continent;
      deaths.textContent = entry.deaths.total;
      population.textContent = entry.population;
      tests.textContent = entry.tests.total;
      
      // Adding the columns to the row.
      tableRow.appendChild(countryData);
      tableRow.appendChild(continent);
      tableRow.appendChild(newCases);
      tableRow.appendChild(activeCases);
      tableRow.appendChild(criticalCases);
      tableRow.appendChild(recoveredCases);
      tableRow.appendChild(totalCases);
      tableRow.appendChild(deaths);
      tableRow.appendChild(population);
      tableRow.appendChild(tests);

      // Appending the rows to the table body.
      tableBody.appendChild(tableRow);
      
    })
    
  })
  .catch(err => console.error(err));

  function filter() {
    // Access text value and elements from the DOM
    let value = document.getElementById('searchInput').value.toUpperCase();
    let countries = document.getElementById('countries');
    let rows = countries.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i += 1) {
      let column = rows[i].getElementsByTagName('td')[0];
      let country = column.textContent;

      // If the input value not found (indexOf value is -1) don't display otherwise display the value.
      rows[i].style.display = 
        country.toUpperCase().indexOf(value) > -1 ? "" : "none";
    }
  }
  document.getElementById('searchInput').addEventListener("keyup", filter); 

