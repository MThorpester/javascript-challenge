// Get the UFO report data from data.js
var UFOdata = data;

// Get a reference to the table body in the index.html file
var tbody = d3.select("tbody");

// For each UFO report, add a row to the table
// For each row, go through each key-value pair in the corresponding UFOreport object and create a table cell for each value 

function displaySightings(UFOreports) {
    tbody.html("");
    UFOreports.forEach((UFOreport) => {
        var row = tbody.append("tr");
        Object.entries(UFOreport).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

// Initial display of all UFO sightings
displaySightings(UFOdata);

// Select the buttons
var filterbutton = d3.select("#filter-btn");
var resetbutton = d3.select("#reset-btn");

// Select the form
var form = d3.select("#form");

// Select filters 
var filters = d3.selectAll('.filter')

// Create the event handlers 
filters.on('change', runEnter);
filterbutton.on("click", runEnter);
form.on("submit",runEnter);
resetbutton.on("click", function() {
    displaySightings(UFOdata);
    document.getElementById("datetime").value="";
    document.getElementById("city").value="";
    document.getElementById("state").value="";
});

// The query function........
function runEnter() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // console.log("Entered the runEnter function");
 // Select the input element and get the raw HTML node then get the value property of the input element
  var InputDate = d3.select("#datetime");
  var DateInput = InputDate.property("value");
  var InputCity = d3.select("#city");
  var CityInput = InputCity.property("value").toLowerCase();
  var InputState = d3.select("#state");
  var StateInput = InputState.property("value").toLowerCase();
  
  if (DateInput) { 
    var filteredData = UFOdata.filter(sighting => sighting.datetime === DateInput);
  }
  else if (CityInput) {
        var filteredData = UFOdata.filter(sighting => sighting.city === CityInput);
        }
        else if(StateInput) {
            var filteredData = UFOdata.filter(sighting => sighting.state === StateInput); 
        }
  // If there are sightings to display for this search criteria, then display them
  // Otherwise, display a message to the user
  if (filteredData.length > 0) {
    displaySightings(filteredData);
  }
  else {
      tbody.html("");
      tbody.append("tr").append("td").text("Sorry...there are no sightings for this search criteria.");
  }
}
