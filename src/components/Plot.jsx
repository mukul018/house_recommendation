import React from 'react';

//to assign the plot
function Plot({ row, column, assignment, onPlotAssign }) {
  const handleClick = () => {
    if (assignment === 'House') {
      alert('This plot already has a house assigned to it!');
    } else {
      const newAssignment = prompt('Assign this plot to:', '');
      if (newAssignment && newAssignment !== assignment) {
        onPlotAssign(row, column, newAssignment);
      }
    }
  };

  return (
    <div className={`plot ${assignment}`} onClick={handleClick}>
      <span>{assignment}</span>
    </div>
  );
}

export default Plot;
