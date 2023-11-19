import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import HorizonParamSelection from "./HorizonParamSelection";

const strategyNames = [
  "None",
  "Aggressive Growth",
  "Customer Acquisition",
  "Product Led Growth",
  "Channel Expansion",
  "Market Expansion",
];

const marketingNames = [
  "None",
  "Campaigns",
  "Digital",
  "Outbound",
  "Inbound",
  "ABM / Events Partners",
];

const sourceNames = [
  "None",
  "Marketing",
  "Sales",
  "Current Pipeline",
  "Model Design",
];

const SimulationParamsSelection = () => {
  // State variables for each select
  const [selectedStrategy, setSelectedStrategy] = useState("None");
  const [selectedMarketing, setSelectedMarketing] = useState("None");
  const [selectedSource, setSelectedSource] = useState("None");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "-30px",
        gap: "10px",
        width: "45%",
      }}
    >
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="strategy-label">Strategy</InputLabel>
        <Select
          labelId="strategy-label"
          id="strategy-select"
          value={selectedStrategy}
          onChange={(e) => setSelectedStrategy(e.target.value)}
          input={<OutlinedInput label="Strategy" />}
          size="small"
        >
          {strategyNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <HorizonParamSelection />

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="marketing-label">Marketing</InputLabel>
        <Select
          labelId="marketing-label"
          id="marketing-select"
          value={selectedMarketing}
          onChange={(e) => setSelectedMarketing(e.target.value)}
          input={<OutlinedInput label="Marketing" />}
          size="small"
        >
          {marketingNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="source-label">Source</InputLabel>
        <Select
          labelId="source-label"
          id="source-select"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          input={<OutlinedInput label="Source" />}
          size="small"
        >
          {sourceNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SimulationParamsSelection;
