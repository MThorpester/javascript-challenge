// Get the UFO report data from data.js
var UFOdata = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// For each UFO report, add a row to the table
// For each row, go through each key-value pair in the corresponding UFOreport object and create a table cell for each value 

data.forEach((UFOreport) => {
  var row = tbody.append("tr");
  Object.entries(UFOreport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});
