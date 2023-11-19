import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import alertify from "alertifyjs";

const horizonNames = {
  "Current Quarter": 13,
  "One Year": 52,
  "Two Years": 104,
  "Three Years": 156,
};

const HorizonParamSelection = () => {
  const [selectedHorizon, setSelectedHorizon] = useState(52);

  useEffect(() => {
    if (localStorage.getItem("KinetikDataSet") !== null) {
      const jsonObject = JSON.parse(localStorage.getItem("KinetikDataSet"));
      setSelectedHorizon(jsonObject.weeks);
    }
  }, []);

  const handleChange = async (event) => {
    await setSelectedHorizon(event.target.value);

    if (localStorage.getItem("KinetikDataSet") !== null) {
      console.log("HorizonParamSelection.js: " + event.target.value);
      const jsonObject = JSON.parse(localStorage.getItem("KinetikDataSet"));
      jsonObject.weeks = Number(event.target.value);
      const jsonString = JSON.stringify(jsonObject);
      localStorage.setItem("KinetikDataSet", jsonString);
    } else {
      alertify.error("Please upload a file first");
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="horizon-label">Horizon</InputLabel>
      <Select
        labelId="horizon-label"
        id="horizon-label"
        value={selectedHorizon}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        size="small"
      >
        {Object.entries(horizonNames).map(([name, value]) => (
          <MenuItem key={name} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HorizonParamSelection;
