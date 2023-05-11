import React, { useState } from 'react';
import Plot from './Plot';

function HousingLayout() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [plots, setPlots] = useState([]);
  const [bestHousePosition, setBestHousePosition] = useState(null);

  // assign the layout accodring to rows and columns
  const handleDimensionsChange = (event) => {
    const { name, value } = event.target;
    if (name === 'rows') {
      setRows(parseInt(value));
    } else if (name === 'columns') {
      setColumns(parseInt(value));
    }
  };

  // assign the plots
  const handlePlotAssign = (row, column, assignment) => {
    const updatedPlots = [...plots];
    if (assignment === 'House') {
      // find the next available house name
      let houseNumber = 1;
      while (updatedPlots.some(row => row.includes(`House ${houseNumber}`))) {
        houseNumber++;
      }
      assignment = `House ${houseNumber}`;
    }
    updatedPlots[row][column] = assignment;
    setPlots(updatedPlots);
  };

  // generates plot in the grid
  const handleLayoutGenerate = () => {
      if (rows <= 0 || columns <= 0 || isNaN(rows) || isNaN(columns)) {
        alert('Please enter valid values for rows and columns.');
        return;
      }
    const updatedPlots = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push('');
      }
      updatedPlots.push(row);
    }
    setPlots(updatedPlots);
  };

  const handleRecommendation = () => {
    if (rows === 0 || columns === 0) {
      alert('Generate the layout.');
      return;
    }
  
    let houseCount = 0;
    const houses = [];
  
    // Find all the houses and their positions
    plots.forEach((row, i) => {
      row.forEach((plot, j) => {
        if (plot.startsWith('House')) {
          houses.push({ row: i, column: j, score: 0, houseName: plot });
          houseCount++;
        }
      });
    });
  
    if (houseCount === 0) {
      alert("Please assign at least one plot as 'House'");
      return;
    }
  
    let maxScore = -Infinity;
    let bestHouse;
  
    // Calculate the score for each house
    houses.forEach((house) => {
      plots.forEach((row, i) => {
        row.forEach((plot, j) => {
          if (plot !== 'House') {
            let distance = Math.abs(i - house.row) + Math.abs(j - house.column);
            if (distance <= 1) {
                // A plot will be considered as a distance of 1km
                if (plot === 'Restaurant') {
                  house.score += 1;
                } else if (plot === 'Gym') {
                  house.score += 1;
                } else if (plot === 'Hospital') {
                  house.score += 1;
                } else if(plot === 'Gym Hospital' || plot === 'Hospital Gym') {
                  house.score += 1;
                } else if(plot === 'Restaurant Hospital' || plot === 'Hospital Restaurant') {
                  house.score += 1;
                } else if(plot === 'Gym Restaurant' || plot === 'Restaurant Gym') {
                  house.score += 1;
                } else if(plot === 'Gym Hospital Restaurant' || plot === 'Gym Restaurant Hospital' || plot === 'Hospital Gym Restaurant' || plot === 'Hospital Restaurant Gym' || plot === 'Restaurant Hospital Gym' || plot === 'Restaurant Gym Hospital') {
                  house.score += 1;
                }
              }
          }
        });
      });
  
      if (house.score > maxScore) {
        maxScore = house.score;
        bestHouse = house;
      }
    });
  
    if (bestHouse) {
      setBestHousePosition({houseName : bestHouse.houseName, row: bestHouse.row, column: bestHouse.column });
    } else {
      setBestHousePosition("Unable to recommend a house.");
    }
  };
  

  return (
    <div className="housing-layout">
      <div className="dimensions-input">
        <label htmlFor="rows">Rows:</label>
        <input type="number" id="rows" name="rows" value={rows} onChange={handleDimensionsChange} />
        <label htmlFor="columns">Columns:</label>
        <input type="number" id="columns" name="columns" value={columns} onChange={handleDimensionsChange} />
        <button onClick={handleLayoutGenerate}>Generate Layout</button>
      </div>
      <div className="plots-container">
        {plots.map((row, i) => (
          <div key={i} className="row">
            {row.map((plot, j) => (
              <Plot key={`${i}-${j}`} row={i} column={j} assignment={plot} onPlotAssign={handlePlotAssign} />
            ))}
          </div>
        ))}
      </div>
      <button className='recommendation' onClick={handleRecommendation}>Recommend House</button>
      {bestHousePosition && (
        <div className="recommendation">
          <p>The best House is {bestHousePosition.houseName} and the position is at row {bestHousePosition.row + 1} and column {bestHousePosition.column + 1}.</p>
        </div>
      )}
    </div>
  );
}

export default HousingLayout;



