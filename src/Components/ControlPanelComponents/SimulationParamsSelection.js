import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Theme,
  useTheme,
} from "@mui/material";

const strategyNames = [
  "Aggressive Growth",
  "Customer Acquisition",
  "Product Led Growth",
  "Channel Expansion",
  "Market Expansion",
];

const horizonNames = [
  "Current Quarter",
  "Current Year",
  "One Year",
  "Two Years",
  "Three Years",
];

const marketingNames = [
  "Campaigns",
  "Digital",
  "Outbound",
  "Inbound",
  "ABM / Events Partners",
];

const sourceNames = ["Marketing", "Sales", "Current Pipeline", "Model Design"];

const SimulationParamsSelection = () => {
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
        <InputLabel id="strategy-label">strategy</InputLabel>
        <Select
          labelId="strategy-label"
          id="strategy-label"
          value={strategyNames}
          input={<OutlinedInput label="Name" />}
          size="small"
        >
          {strategyNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="horizon-label">Horizon</InputLabel>
        <Select
          labelId="horizon-label"
          id="horizon-label"
          value={horizonNames}
          input={<OutlinedInput label="Name" />}
          size="small"
        >
          {horizonNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="marketing-label">Marketing</InputLabel>
        <Select
          labelId="marketing-label"
          id="marketing-label"
          value={marketingNames}
          input={<OutlinedInput label="Name" />}
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
          id="source-label"
          value={sourceNames}
          input={<OutlinedInput label="Name" />}
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
