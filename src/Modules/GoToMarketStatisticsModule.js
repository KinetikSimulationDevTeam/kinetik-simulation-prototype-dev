import React, { useState, useEffect } from "react";

const GoToMarketStatisticsModule = ({ lambdaOutput }) => {
  const [customerAcquisitionCost, setCustomerAcquisitionCost] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [leads, setLeads] = useState(0);
  const [mqls, setMqls] = useState(0);

  useEffect(() => {
    if (lambdaOutput === undefined) return;

    setWinRate(
      Math.round(
        (lambdaOutput[lambdaOutput.length - 1].find(
          (obj) => obj.Stage === "Win"
        ).values /
          (lambdaOutput[lambdaOutput.length - 1].find(
            (obj) => obj.Stage === "Win"
          ).values +
            lambdaOutput[lambdaOutput.length - 1].find(
              (obj) => obj.Stage === "Loss"
            ).values)) *
          100
      )
    );

    // add all the opportunities of each week to get the total number of new opportunities
    let totalOpportunities = 0;
    for (let i = 0; i < lambdaOutput.length; i++) {
      totalOpportunities += lambdaOutput[i].find(
        (obj) => obj.Stage === "New Opportunities"
      ).values;
    }

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

    await setLeads(totalOpportunities * 18);
    await setMqls(Math.round((totalOpportunities * 18) / 10));
  }

  return (
    <div id="statistics-top-module-layout">
      <h3 className="title">Go-to Market Statistics</h3>
      <div className="statistics-module-info">
        <p className="statistics-module-info-legend">
          Customer Acquisition Cost:
          <span className="statistics-module-info-values"></span>
        </p>

        <p className="statistics-module-info-legend">
          Marketing Qualified Leads:
          <span className="statistics-module-info-values">{mqls}</span>
        </p>

        <p className="statistics-module-info-legend">
          Sales Qualified Leads:
          <span className="statistics-module-info-values">
            {Math.round(mqls / 3)}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          Win Rate:
          <span className="statistics-module-info-values">
            {winRate.toLocaleString("en")}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default GoToMarketStatisticsModule;
