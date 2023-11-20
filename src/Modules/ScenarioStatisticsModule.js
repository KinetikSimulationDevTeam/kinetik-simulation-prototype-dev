import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const ScenarioAnalysisModule = ({ lambdaOutput }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [wins, setWins] = useState(0);
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    if (lambdaOutput === undefined) return;
    setTotalRevenue(
      lambdaOutput[lambdaOutput.length - 1].find(
        (obj) => obj.Stage === "Revenue"
      ).values
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
  }, [lambdaOutput]);

  return (
    <div id="statistics-module-layout">
      <h3 className="title">Scenario Statistics</h3>
      <div className="statistics-module-info">
        <Box>
          <p className="statistics-module-info-legend">
            Total Revenue:
            <span className="statistics-module-info-values">
              ${totalRevenue.toLocaleString("en")}M
            </span>
          </p>

          <p className="statistics-module-info-legend">
            Wins:
            <span className="statistics-module-info-values">
              ${wins.toLocaleString("en")}M
            </span>
          </p>
        </Box>

        <Box>
          <p className="statistics-module-info-legend">
            Lost Opportunities:
            <span className="statistics-module-info-values">
              ${loss * (0.368).toLocaleString("en")}M
            </span>
          </p>

          <p className="statistics-module-info-legend">
            Losses:
            <span className="statistics-module-info-values">
              {Math.round(loss).toLocaleString("en")}
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
          <span className="statistics-module-info-values">Coming Soon</span>
        </p>

        <p className="statistics-module-info-legend">
          Ending APR:
          <span className="statistics-module-info-values">Coming Soon</span>
        </p>

        <p className="statistics-module-info-legend">
          APR CAGR:
          <span className="statistics-module-info-values">Coming Soon</span>
        </p>
      </div>
    </div>
  );
};

export default ScenarioAnalysisModule;
