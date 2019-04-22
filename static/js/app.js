// from data.js
var tableData = data;

var tableBody = d3.select("tbody");
var searchBtn = d3.select("#filter-btn");
var clearSearchBtn = d3.select("#clear-filter-btn");
var dtSelector = d3.select("#datetimeSelector");
var ctSelector = d3.select("#citySelector");
var stSelector = d3.select("#stateSelector");
var cntSelector = d3.select("#countrySelector");
var spSelector = d3.select("#shapeSelector");

var selectStr = "--Select";

var sightingDates = [];
var sightingCities = [];
var sightingStates = [];
var sightingCountries = [];
var sightingShapes = [];
var selectedTableData = [];


function init() {
    tableData = data;
    selectedTableData = [];
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


function clearAndBringTableToView() {
    let table = document.getElementById("ufo-table");

    for (let rowNum = table.rows.length - 1; rowNum > 0; rowNum--) {
        table.deleteRow(rowNum);
    }
    table.scrollIntoView();
}


function setDatesSelectOption(dates) {
    dtSelector.selectAll("option").data(dates).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


function setCitiesSelectOption(cities) {
    ctSelector.selectAll("option").data(cities).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


function setStatesSelectOption(states) {
    stSelector.selectAll("option").data(states).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


function setCountriesSelectOption(countries) {
    cntSelector.selectAll("option").data(countries).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


function setShapesSelectOption(shapes) {
    spSelector.selectAll("option").data(shapes).enter().append("option").text(function(d) {
        return d;
    }).attr("value", function(d) {
        return d;
    });
}


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


clearSearchBtn.on("click", function() {
    console.log("reached clear");
    clearAndBringTableToView();
    init();
});


searchBtn.on("click", function() {

    let table = document.getElementById("ufo-table");
    let allData = data;
    let searchDate = dtSelector.property("value");
    let searchCity = ctSelector.property("value");
    let searchState = stSelector.property("value");
    let searchCountry = cntSelector.property("value");
    let searchShape = spSelector.property("value");

    console.log(table.rows.length);
    clearAndBringTableToView();
    if (searchDate == selectStr && searchCity == selectStr &&
        searchState == selectStr && searchCountry == selectStr &&
        searchShape == selectStr) {
        init();
        return;
    }

    console.log(table.rows.length);
    allData.forEach((ufoSightingRecord) => {
        if((searchDate != selectStr && searchDate == ufoSightingRecord.datetime) ||
            (searchCity != selectStr && searchCity == ufoSightingRecord.city) ||
            (searchState != selectStr && searchState == ufoSightingRecord.state) ||
            (searchCountry != selectStr && searchCountry == ufoSightingRecord.country) ||
            (searchShape != selectStr && searchShape == ufoSightingRecord.shape)) {
            selectedTableData.push(ufoSightingRecord);
        }
    });
    if (searchDate != selectStr) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.datetime == searchDate);
    }
    if (searchCity != selectStr) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.city == searchCity);
    }
    if (searchState != selectStr) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.state == searchState);
    }
    if (searchCountry != selectStr) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.country == searchCountry);
    }
    if (searchShape != selectStr) {
        selectedTableData = selectedTableData.filter((selectedUFOSightingRecord) =>
            selectedUFOSightingRecord.shape == searchShape);
    }


    selectedTableData.forEach(ufoSightingRecord => updateTableData(ufoSightingRecord));
    selectedTableData = [];
    table.scrollIntoView();

    console.log(table.rows.length);
});


init();