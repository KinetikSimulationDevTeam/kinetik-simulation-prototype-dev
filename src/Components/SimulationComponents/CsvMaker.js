import alertify from "alertifyjs";

const csvMaker = (lambdaOutput, scenarioValues) => {
  try {
    // Empty array for storing the values
    let csvRows = [];

    const headers = lambdaOutput[0]
      .filter((obj) => obj.Stage !== "Movement Flow")
      .map((obj) => {
        if (obj.Stage === "Revenue") {
          return "Revenue($M)";
        }
        return obj.Stage;
      });
    const headersWithWeek = [
      "Week",
      ...headers,
      "Leads(% change)",
      "Opportunities(% change)",
      "Progression(% change)",
      "Closing(% change)",
      "Win Rate(% change)",
      "Market Dynamics(% change)",
    ];

    csvRows.push(headersWithWeek.join(","));

    for (let i = 0; i < lambdaOutput.length; i++) {
      const row = lambdaOutput[i]
        .filter((obj) => obj.Stage !== "Movement Flow")
        .map((obj) => obj.values);
      let rowWithWeek = [i + 1, ...row];

      if (i === 0) {
        rowWithWeek = [...rowWithWeek, scenarioValues];
      }

      csvRows.push(rowWithWeek.join(","));
    }

    return csvRows.join("\n");
  } catch (error) {
    alertify.error("Error when parsing results to CSV");
  }
};

export default csvMaker;
