import React, { useState, useEffect } from "react";

const GoToMarketStatisticsModule = ({
  lambdaOutput,
  marketingInputFileResponse,
}) => {
  const [winRate, setWinRate] = useState(0);
  const [leads, setLeads] = useState(0);
  const [mqls, setMqls] = useState(0);
  const [totalOpportunities, setTotalOpportunities] = useState(0);
  const [wins, setWins] = useState(0);

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

    await setWins(
      Math.round(
        lambdaOutput[lambdaOutput.length - 1].find((obj) => obj.Stage === "Win")
          .values
      )
    );
    await setTotalOpportunities(totalOpportunities);
    await setLeads(totalOpportunities * 18);
    await setMqls(Math.round((totalOpportunities * 18) / 10));
  }

  return (
    <div id="statistics-module-layout">
      <h3 className="title">Go-to Market Statistics</h3>
      <div className="statistics-module-info">
        <p className="statistics-module-info-legend">
          Customer Acquisition Cost:
          <span className="statistics-module-info-values">
            $
            {totalOpportunities === 0
              ? 0
              : Math.round(
                  (leads * 750 + totalOpportunities * 3250) / wins
                ).toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          New Leads:
          <span className="statistics-module-info-values">
            {Math.round(leads).toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          Marketing Qualified Leads:
          <span className="statistics-module-info-values">
            {marketingInputFileResponse === null
              ? Math.round(mqls).toLocaleString("en")
              : marketingInputFileResponse.MQL.toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          Sales Qualified Leads:
          <span className="statistics-module-info-values">
            {marketingInputFileResponse === null
              ? Math.round(mqls / 3).toLocaleString("en")
              : marketingInputFileResponse.SQL.toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          New Opportunities:
          <span className="statistics-module-info-values">
            {Math.round(totalOpportunities).toLocaleString("en")}
          </span>
        </p>

        <p className="statistics-module-info-legend">
          Progression Velocity:
          <span className="statistics-module-info-values">9%</span>
        </p>

        <p className="statistics-module-info-legend">
          Closing Velocity:
          <span className="statistics-module-info-values">48%</span>
        </p>

        <p className="statistics-module-info-legend">
          Win Rate:
          <span className="statistics-module-info-values">
            {Math.round(winRate).toLocaleString("en")}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default GoToMarketStatisticsModule;
