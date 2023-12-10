import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const ScenarioAnalysisModule = ({ lambdaOutput }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [wins, setWins] = useState(0);
  const [loss, setLoss] = useState(0);
  const [lastPipeline, setLastPipeline] = useState(0);
  const [endingARR, setEndingARR] = useState(0);

  useEffect(() => {
    if (lambdaOutput === undefined) return;
    setTotalRevenue(
      lambdaOutput[lambdaOutput.length - 1].find(
        (obj) => obj.Stage === "Revenue"
      ).values,
      setEndingARR(((totalRevenue * 1000000) / lambdaOutput.length).toFixed(0))
    );
    setWins(
      Math.round(
        lambdaOutput[lambdaOutput.length - 1].find((obj) => obj.Stage === "Win")
          .values
      )
    );

    setLoss(
      lambdaOutput[lambdaOutput.length - 1].find((obj) => obj.Stage === "Loss")
        .values
    );

    // Count all pipeline values for the statistics module
    let countLastPipeline = 0;
    const totalStages = lambdaOutput[lambdaOutput.length - 1].length - 5;

    for (let i = 0; i < totalStages; i++) {
      countLastPipeline += lambdaOutput[lambdaOutput.length - 1][i].values;
    }

    setLastPipeline(countLastPipeline);
  }, [lambdaOutput]);

  return (
    <div id="statistics-module-layout">
      <h3 className="title">Scenario Statistics</h3>
      <div className="statistics-module-info">
        <Box>
          <p className="statistics-module-info-legend">
            Total Revenue:
            <span className="statistics-module-info-values">
              ${totalRevenue.toFixed(0).toLocaleString("en")}M
            </span>
          </p>

          <p className="statistics-module-info-legend">
            Wins:
            <span className="statistics-module-info-values">
              {wins.toFixed(0).toLocaleString("en")}
            </span>
          </p>
        </Box>

        <Box>
          <p className="statistics-module-info-legend">
            Lost Opportunities:
            <span className="statistics-module-info-values">
              ${(loss * 0.368).toFixed(0).toLocaleString("en")}M
            </span>
          </p>

          <p className="statistics-module-info-legend">
            Losses:
            <span className="statistics-module-info-values">
              {Math.round(loss).toFixed(0).toLocaleString("en")}
            </span>
          </p>
        </Box>

        <Box>
          <p className="statistics-module-info-legend">
            Did not Pursue:
            <span className="statistics-module-info-values">Coming Soon</span>
          </p>

          <p className="statistics-module-info-legend">
            DNP:
            <span className="statistics-module-info-values">Coming Soon</span>
          </p>
        </Box>

        <p className="statistics-module-info-legend">
          Ending Pipeline:
          <span className="statistics-module-info-values">
            {lastPipeline.toFixed(0).toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          Ending ARR:
          <span className="statistics-module-info-values">
            ${endingARR.toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          ARR CAGR:
          <span className="statistics-module-info-values">Coming Soon</span>
        </p>
      </div>
    </div>
  );
};

export default ScenarioAnalysisModule;
