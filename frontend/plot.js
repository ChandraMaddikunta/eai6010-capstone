const BACKGROUND = "white";


function countyBarChartPlot(counties) {
  let div = document.getElementById("plot-container");
  
  let trace = {
    x: counties.map((county_obj) => county_obj.county),
    y: counties.map((county_obj) => county_obj.casesConfirmed),
    type: 'bar',
    marker: {
      color: '#e78d5e'
    }
  };
  let data = [trace];
  
  let layout = {
    height: 0.45 * window.innerHeight,
    width: 600,
    showlegend: false,
    plot_bgcolor: BACKGROUND,
    paper_bgcolor: BACKGROUND,
    dtick: 3,
    
    xaxis: {
      showline: true,
      showgrid: false,
      showticklabels: true,
      fixedrange: true,
      linewidth: 2,
      tickwidth: 2,
      ticklen: 5,
      tickfont: {family: 'Roboto', size: 10}
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      fixedrange: true,
      showline: false,
      showticklabels: false
    },
    autosize: false,
    margin: {
      autoexpand: false,
      l: 15,
      r: 15,
      t: 40,
      b: 50
    },
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.0,
        y: 1.05,
        xanchor: 'left',
        yanchor: 'bottom',
        text: ``,
        font: {
          family: 'Roboto',
          size: 14,
        },
        showarrow: false
      },
    ]
  };
  let config = {responsive: true}
  Plotly.newPlot(div, data, layout, config);
}
