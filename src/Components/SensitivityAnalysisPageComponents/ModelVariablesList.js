import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API } from "aws-amplify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import RevenueImpactBrick from "./RevenueImpactBrick";
import alertify from "alertifyjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingReminder from "./LoadingReminder";

const ModelVariablesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [
    normalizeSensitivityAnalysisLambdaResult,
    setNormalizeSensitivityAnalysisLambdaResult,
  ] = useState(null);
  const [stages, setStages] = useState(null);
  const [maxNumberIncrease, setMaxNumberIncrease] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("KinetikDataSet") != null) {
        const lambdaResult = await callSensitivityAnalysisLambda(
          localStorage.getItem("KinetikDataSet")
        );
        await setStages(lambdaResult[0]);
        console.log("stages: ", stages);
        const nomalizeLambdaResult = normalizeArray(lambdaResult);
        await setNormalizeSensitivityAnalysisLambdaResult(nomalizeLambdaResult);
        console.log("nomalizeLambdaResult: ", nomalizeLambdaResult);
      }
    }

    fetchData();
  }, []);

  const callSensitivityAnalysisLambda = async (input) => {
    try {
      setIsLoading(true);

      const response = await API.post(
        "getSimulationOutput",
        "/sensitivityanalysis",
        {
          body: input,
        }
      );

      setIsLoading(false);
      return response;
    } catch (e) {
      console.log(e);
      alertify.error(
        "An error occurred while running the sensitivity analysis"
      );
      setIsLoading(false);
    }
  };

  const normalizeArray = (arr) => {
    const arrayWithoutFirstElement = arr.slice(1);
    const flattenedArray = arrayWithoutFirstElement.flat();
    const maxNumber = Math.max(...flattenedArray);
    setMaxNumberIncrease(maxNumber);

    const normalizedArray = arrayWithoutFirstElement.map((innerArr) =>
      innerArr.map((num) => num / maxNumber)
    );

    return normalizedArray;
  };

  const h5Components = [
    <h5>This may take a few minutes</h5>,
    <h5>Visit kinetiksimulation.com for more information</h5>,
    <h5>Contact admin@kinetiksimulation.com to book a demo</h5>,
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="sortable and selectable table"
        >
          <TableHead sx={{ backgroundColor: "rgb(1, 118, 211)" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Revenue Impact
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Constraining Factor
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Resources
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Productivity/Execution
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Mix
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {normalizeSensitivityAnalysisLambdaResult !== null &&
              normalizeSensitivityAnalysisLambdaResult.map((value, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ width: "30%" }}>
                    <RevenueImpactBrick
                      modelVariable={value}
                      maxNumberIncrease={maxNumberIncrease}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {stages[index]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <div className="loading-backdrop-layout">
            <CircularProgress color="inherit" />
            <LoadingReminder components={h5Components} />
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default ModelVariablesList;
