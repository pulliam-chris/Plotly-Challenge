function init() {

    // Read in the samples JSON file and process
    d3.json('samples.json').then(function(data) {
         
    // Capture names to build drop-down list on page
    let names = Object.values(data.names);
    let dropdown = d3.select("#selDataset");

    // Build the list
    names.forEach((id) => {
      let option = dropdown.append("option");
        option.text(id);
    })

    // Capture initial selection in drop-down
    let initialSelection = d3.select("option").text();
    
    // Capture samples and demographic objects
    let samples = data.samples;
    let demographics = data.metadata;
    
    // Filter the data based on the current subject ID
    let filteredData = filterData(samples, initialSelection);
    // Separate Object from returned array
    let sample_values = filteredData[0].sample_values;
    
    // Since already sorted slice top 10 data elements
    let sorted_values = sample_values.slice(0,10);
    let ids = filteredData[0].otu_ids.slice(0,10);
    let labels = filteredData[0].otu_labels.slice(0,10);
    
    //Construct Bar plot from captured data
    let trace1 = {
      //Reverse ordering based on Plotly's default
      x: sorted_values.reverse(),
      y: ids.reverse(),
      text: labels.reverse(),
      type: "bar",
      orientation: "h"
    }

    let traceData = [trace1];

    let layout = {
      title: `Ten Largest Samples by Subject`,
      width: 600,
      height: 450,
      xaxis: {
        title: "Sample Amount"
      },
      yaxis: {
        title: "OTU ID",
        autorange: true,
        type: "category"
      },
      showlegend: false
    }
    // Add figure to page at selected <div>
    Plotly.newPlot("bar", traceData, layout);
    
    // Create Bubble Chart
    // sizeref using above forumla
    const desired_maximum_marker_size = 80;
    const size = sample_values;
    
    // Rebuild data to load all subject ID results
    ids = filteredData[0].otu_ids;
    labels = filteredData[0].otu_labels;
    
    let trace2 = {
      x: ids,
      y: sample_values,
      text: labels,
      mode: 'markers',
      marker: {
        size: size,
        colorscale: 'Portland',
        color: ids,
        //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
        sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
        sizemode: 'area'
      },
    };
    
    let tracedata2 = [trace2];
    
    let bublayout = {
      title: 'All Samples by Subject',
      showlegend: false,
      height: 600,
      width: 1000,
      xaxis: {
        title: "OTU ID"
      },
      yaxis: {
        title: "Sample Amount"
      }
    };
    
    // Add figure to page at selected <div>
    Plotly.newPlot('bubble', tracedata2, bublayout);
        
    // Create demographic section from matching subject metadata
    let filteredDemographics = filterDemographics(demographics, initialSelection);
    filteredDemographics = filteredDemographics[0];
    
    let panel = d3.select("#sample-metadata");
       
    for (const [key, value] of Object.entries(filteredDemographics)) {
      //console.log(`${key}: ${value}`);
      let line = panel.append("p");
      line.text(`${key}: ${value}`);
    }
  })

// External function to capture sample data based on passed ID value  
function filterData(samples, selectedID) {
  filteredData = samples.filter(subject => subject.id === selectedID);
  return filteredData;
}    

// External function to capture metadata based on passed ID value
function filterDemographics(metadata, selectedID) {
  filteredDemo = metadata.filter(subject => subject.id === parseInt(selectedID));
  return filteredDemo;
}
    

};

// On change of Subject ID, repeat plot processes with new value
function optionChanged(currentValue) {
    console.log(currentValue);
  }


// Run initial function to build page first
init();
