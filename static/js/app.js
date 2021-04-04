
/*function buildPlot (samples) {
    console.log(samples);

    let id = "940"
    trace1 = {
      x: unpack(samples.samples, 2),
      y: unpack(samples.samples, 1),
      type: "bar",
      //orientation: "h"
    }

    let traceData = [trace1];

    layout = {
      orientation: "h"

    }

    Plotly.newPlot("bar", traceData, layout);
}*/

//function buildDropDown

//var select = document.getElementById("selectNumber"); 
//var options = ["1", "2", "3", "4", "5"]; 

//for(var i = 0; i < options.length; i++) {
//    var opt = options[i];
//    var el = document.createElement("option");
//    el.textContent = opt;
//    el.value = opt;
//    select.appendChild(el);
//}​

//function buildTable


function unpack(rows, index) {
      return rows.map(function(row) {
      return row[index];
      })
  }

function init() {

    d3.json('samples.json').then(function(data) {
    //console.log(data);
     
    let names = Object.values(data.names);
    //console.log(names);
    
    let dropdown = d3.select("#selDataset");

    names.forEach((id) => {
      let option = dropdown.append("option");
        option.text(id);
        //option.value(id);
        //console.log(optionChanged);
      })

    let initialSelection = d3.select("option").text();
    console.log(initialSelection);

    let samples = data.samples;
    //console.log(samples)
    let filteredData = filterData(samples, initialSelection);
    //console.log(filteredData[0].sample_values);
    let sample_values = filteredData[0].sample_values;
    let ids = filteredData[0].otu_ids;
    console.log(ids);
    console.log(sample_values);
    })

function filterData(samples, byID) {
  filteredData = samples.filter(subject => subject.id === byID);
  //console.log(filteredData) 
  //let sampleValues = filteredData.map(filteredData);
  //console.log(sampleValues);
  return filteredData;
}    

    //let samples = Object.values(data.samples);
    //let sampleValues = samples[0].sample_values;
    //console.log(sampleValues);

    //let samples = data.samples; //map(row[2]);
    //let id = "940"
    //let sampleValues = samples.filter(samples.name === id)
    //console.log(sampleValues);

    

    };

function optionChanged(currentValue) {
    //let currentSelection = d3.select("option")
    console.log(currentValue);
  }


init();

//form.optionChanged("optionChanged", optionChanged);

// Load sample data
//d3.json('samples.json').then(data => {
//  const dataset = data;
//  buildPlot(dataset)
//});
