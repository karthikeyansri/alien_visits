// from data.js
var tableData = data;

// variables for html elements
var tableBody = d3.select("tbody");
var searchBtn = d3.select("#filter-btn");
var clearSearchBtn = d3.select("#clear-filter-btn");
var dtSelector = d3.select("#datetimeSelector");
var ctSelector = d3.select("#citySelector");
var stSelector = d3.select("#stateSelector");
var cntSelector = d3.select("#countrySelector");
var spSelector = d3.select("#shapeSelector");

// variables for storing unique search values
var selectStr = "--Select";

var sightingDates = [];
var sightingCities = [];
var sightingStates = [];
var sightingCountries = [];
var sightingShapes = [];
var selectedTableData = [];


// Initialization - sets the records in the html table and sets the filter selection values
function init() {
    tableData = data;
    selectedTableData = [];
    
    // set the filter values to dummy values during initialization. 
    // Only the users must be allowed to select values in filter drop-downs
    sightingDates = [selectStr];
    sightingCities = [selectStr];
    sightingStates = [selectStr];
    sightingCountries = [selectStr];
    sightingShapes = [selectStr];
    tableData.forEach(ufoSightingRecord => updateTableData(ufoSightingRecord));
    setDatesSelectOption(sightingDates);
    setCitiesSelectOption(sightingCities);
    setStatesSelectOption(sightingStates);
    setCountriesSelectOption(sightingCountries);
    setShapesSelectOption(sightingShapes);
    document.getElementById("datetimeSelector").options[0].selected = true;
    document.getElementById("citySelector").options[0].selected = true;
    document.getElementById("stateSelector").options[0].selected = true;
    document.getElementById("countrySelector").options[0].selected = true;
    document.getElementById("shapeSelector").options[0].selected = true;
}


// remove all values from HTML table before rendering filter data
function clearAndBringTableToView() {
    let table = document.getElementById("ufo-table");

    for (let rowNum = table.rows.length - 1; rowNum > 0; rowNum--) {
        table.deleteRow(rowNum);
    }
    table.scrollIntoView();
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


toUpper = function(x){
  return x.toUpperCase();
};


// add unique values to drop-down options - Dates
function setDatesSelectOption(dates) {

    dates.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a) - new Date(b);
    });

    dtSelector.selectAll("option").data(dates).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


// add unique values to drop-down options - Cities
function setCitiesSelectOption(cities) {

    cities.sort();
    cities = cities.map(capitalizeFirstLetter);

    ctSelector.selectAll("option").data(cities).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


// add unique values to drop-down options - States
function setStatesSelectOption(states) {

    states.sort();
    states = states.map(capitalizeFirstLetter);

    stSelector.selectAll("option").data(states).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


// add unique values to drop-down options - Countries
function setCountriesSelectOption(countries) {

    countries.sort();
    countries = countries.map(toUpper);
    countries[0] = selectStr;

    cntSelector.selectAll("option").data(countries).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


// add unique values to drop-down options - UFO Shapes
function setShapesSelectOption(shapes) {

    shapes.sort();
    shapes = shapes.map(capitalizeFirstLetter);

    spSelector.selectAll("option").data(shapes).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


// Call the function to append each data to HTML table
// also set unique values to collections for filter drop-down options
function updateTableData(ufoSightingRecord) {
    var row = tableBody.append("tr");
    Object.entries(ufoSightingRecord).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
        switch(key) {
            case "datetime":
                if(!sightingDates.includes(value)) {
                    sightingDates.push(value);
                }
                break;
            case "city":
                if(!sightingCities.includes(value)) {
                    sightingCities.push(value);
                }
                break;
            case "state":
                if(!sightingStates.includes(value)) {
                    sightingStates.push(value);
                }
                break;
            case "country":
                if(!sightingCountries.includes(value)) {
                    sightingCountries.push(value);
                }
                break;
            case "shape":
                if(!sightingShapes.includes(value)) {
                    sightingShapes.push(value);
                }
                break;
        }
    });
}


// RESET all data to initial state when cleear search button is clicked
clearSearchBtn.on("click", function() {
    console.log("reached clear");
    clearAndBringTableToView();
    init();
});


// search for the respective rows as and when
// the drop-down values of the search fields are
// modified by the user.
dtSelector.on("change", updateSearchResults);
ctSelector.on("change", updateSearchResults);
stSelector.on("change", updateSearchResults);
cntSelector.on("change", updateSearchResults);
spSelector.on("change", updateSearchResults);


function updateSearchResults() {

    // store user input in local variables
    let table = document.getElementById("ufo-table");
    let allData = data;
    let searchDate = dtSelector.property("value");
    let searchCity = ctSelector.property("value").toLowerCase();
    let searchState = stSelector.property("value").toLowerCase();
    let searchCountry = cntSelector.property("value").toLowerCase();
    let searchShape = spSelector.property("value").toLowerCase();

//    console.log(searchDate);console.log(searchCity);console.log(searchState);
//    console.log(searchCountry);console.log(searchShape);

    // clear table rows before search
    clearAndBringTableToView();
    if (searchDate == selectStr && searchCity == selectStr.toLowerCase() &&
        searchState == selectStr.toLowerCase() && searchCountry == selectStr.toLowerCase() &&
        searchShape == selectStr.toLowerCase()) {
        init();
        return;
    }

    // add all records that meet the user input criteria
    allData.forEach((ufoSightingRecord) => {
        if((searchDate != selectStr && searchDate == ufoSightingRecord.datetime) ||
            (searchCity != selectStr && searchCity == ufoSightingRecord.city) ||
            (searchState != selectStr && searchState == ufoSightingRecord.state) ||
            (searchCountry != selectStr && searchCountry == ufoSightingRecord.country) ||
            (searchShape != selectStr && searchShape == ufoSightingRecord.shape)) {
            selectedTableData.push(ufoSightingRecord);
        }
    });

    //retain only the records that meet the user criteria Use js array filters
    if (searchDate != selectStr) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.datetime == searchDate);
    }
    if (searchCity != selectStr.toLowerCase()) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.city == searchCity);
    }
    if (searchState != selectStr.toLowerCase()) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.state == searchState);
    }
    if (searchCountry != selectStr.toLowerCase()) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.country == searchCountry);
    }
    if (searchShape != selectStr.toLowerCase()) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.shape == searchShape);
    }


    // append the selected elements stored in array to table
    selectedTableData.forEach(ufoSightingRecord => updateTableData(ufoSightingRecord));

    // RESET the array for next search
    selectedTableData = [];

    // bring the top of the table to view
    table.scrollIntoView();
}


//// SEARCh functionality based on user input
//searchBtn.on("click", function() {
//    updateSearchResults();
//    console.log(table.rows.length);
//});


init();
