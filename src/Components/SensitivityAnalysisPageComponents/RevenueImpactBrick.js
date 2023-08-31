import React, { useEffect, useState } from "react";

const RevenueImpactBrick = ({ modelVariable, maxNumberIncrease }) => {
  const [fifteenPercentValue, setFifteenPercentValue] = useState(0);

  useEffect(() => {
    for (let i = 0; i < modelVariable.length; i++) {
      if (modelVariable[i] < 0) {
        modelVariable[i] = 0;
      }

      if (i !== 0) {
        if (modelVariable[i] < modelVariable[i - 1]) {
          modelVariable[i] = modelVariable[i - 1];
        }
      }
    }
    setFifteenPercentValue(modelVariable[2]);
  }, [modelVariable]);

  const rectangleStyles5percent = {
    width: `${33 * modelVariable[0]}%`,
    backgroundColor: "rgb(238, 244, 255)",
  };

  const rectangleStyles10percent = {
    width: `${33 * modelVariable[1]}%`,
    backgroundColor: "rgb(27, 150, 255)",
  };

  const rectangleStyles15percent = {
    width: `${33 * modelVariable[2]}%`,
    backgroundColor: "rgb(1, 118, 211)",
  };

  return (
    <div className="revenue-impact-retangle-layout">
      <div
        className="revenue-impact-retangle"
        style={rectangleStyles5percent}
      />
      <div
        className="revenue-impact-retangle"
        style={rectangleStyles10percent}
      />
      <div className="revenue-impact-retangle" style={rectangleStyles15percent}>
        {modelVariable[2] > 0.44 && (
          <p className="revenue-impact-number">
            {(fifteenPercentValue * maxNumberIncrease).toFixed(1)}M
          </p>
        )}
      </div>
    </div>
  );
};

export default RevenueImpactBrick;
