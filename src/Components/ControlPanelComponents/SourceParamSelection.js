import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";

const sourceNames = [
  "None",
  "Marketing",
  "Sales",
  "Current Pipeline",
  "Model Design",
];

const SourceParamSelection = () => {
  const [selectedSource, setSelectedSource] = useState(["None"]);

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === "Marketing") {
    }

    // Remove "None" when other options are selected or add it back when all others are removed
    const sources = value.includes("None")
      ? ["None"]
      : value.filter((item) => item !== "None");

    setSelectedSource(sources);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="source-label">Source</InputLabel>
      <Select
        labelId="source-label"
        id="source-select"
        multiple
        value={selectedSource}
        onChange={handleChange}
        input={<OutlinedInput label="Source" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        size="small"
      >
        {sourceNames.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SourceParamSelection;
