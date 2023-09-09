import React, { useState, useEffect } from "react";

const ScenarioAnalysisModule = ({ lambdaOutput }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [newOpportunities, setNewOpportunities] = useState(0);
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

    processLeads();
  }, [lambdaOutput]);

  async function processLeads() {
    let totalOpportunities = 0;
    for (let i = 0; i < lambdaOutput.length; i++) {
      const obj = lambdaOutput[i].find(
        (obj) => obj.Stage === "New Opportunities"
      );
      totalOpportunities += obj.values;
    }

    await setNewOpportunities(Math.round(totalOpportunities));
    await setNewLeads(Math.round(totalOpportunities * 18));
  }

  return (
    <div id="statistics-module-layout">
      <h3 className="title">Scenario Statistics</h3>
      <div className="statistics-module-info">
        <p className="statistics-module-info-legend">
          Total Revenue:
          <span className="statistics-module-info-values">
            ${totalRevenue.toLocaleString("en")}M
          </span>
        </p>
        <p className="statistics-module-info-legend">
          Loss:
          <span className="statistics-module-info-values">
            {Math.round(loss).toLocaleString("en")}
          </span>
        </p>
        <p className="statistics-module-info-legend">
          New Leads:
          <span className="statistics-module-info-values">
            {Math.round(newLeads).toLocaleString("en")}
          </span>
        </p>
        <p className="statistics-module-info-legend">
          New Opportunities:
          <span className="statistics-module-info-values">
            {Math.round(newOpportunities).toLocaleString("en")}
          </span>
        </p>
        <p className="statistics-module-info-legend">
          Wins:
          <span className="statistics-module-info-values">
            {Math.round(wins).toLocaleString("en")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ScenarioAnalysisModule;
