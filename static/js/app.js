
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


//function unpack(rows, index) {
//      return rows.map(function(row) {
//      return row[index];
//      })
//  }

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
    let demographics = data.metadata;
    //console.log(demographics)
    let filteredData = filterData(samples, initialSelection);
    //console.log(filteredData[0].sample_values);
    let sample_values = filteredData[0].sample_values;
    let sorted_values = sample_values.slice(0,10);
    //let sorted_indexes = sorted_values.keys();
    //sample_values = sample_values.slice(0,10);
    let ids = filteredData[0].otu_ids.slice(0,10);
    let labels = filteredData[0].otu_labels.slice(0,10);
    console.log(ids);
    console.log(sorted_values);
    //console.log(sorted_indexes);
    console.log(labels);
        
    //let sorted_ids = [];
    //let sorted_labels = [];
    
    //for (i of sorted_indexes) {
    //  sorted_ids[i] = ids[i];
    //}
    
    //console.log(sorted_ids);

    trace1 = {
      x: sorted_values.reverse(),
      y: ids.reverse(),
      text: labels.reverse(),
      //textposition: left,
      type: "bar",
      orientation: "h"
    }

    let traceData = [trace1];

    let layout = {
      title: ` `,
      xaxis: {
        //range: [startDate, endDate],
        //type: "date"
      },
      yaxis: {
        //text: "OTU ID",
        autorange: true,
        type: "category"
      },
      showlegend: false
    }
    Plotly.newPlot("bar", traceData, layout);
    
    let filteredDemographics = filterDemographics(demographics, initialSelection);
    filteredDemographics = filteredDemographics[0];
    console.log(filteredDemographics);

    let panel = d3.select("#sample-metadata");
       
    for (const [key, value] of Object.entries(filteredDemographics)) {
      //console.log(`${key}: ${value}`);
      let line = panel.append("p");
      line.text(`${key}: ${value}`);
    }
   

  })

function filterData(samples, selectedID) {
  filteredData = samples.filter(subject => subject.id === selectedID);
  //console.log(filteredData) 
  //let sampleValues = filteredData.map(filteredData);
  //console.log(sampleValues);
  return filteredData;
}    

function filterDemographics(metadata, selectedID) {
  filteredDemo = metadata.filter(object => object.id === parseInt(selectedID));
  return filteredDemo;
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
