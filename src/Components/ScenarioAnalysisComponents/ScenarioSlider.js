import React, { useState, useEffect } from "react";
import { Box, Typography, Slider } from "@mui/material";

/*
    Description: This component is used to display the sliders for the scenerio analysis.

    Arguments: name: name of the slider

              mean: mean value of the slider

              onSliderChange: callback function to update the state in ScenerioSliders

    Return Type: None
*/
const ScenerioSlider = ({ name, mean, onSliderChange, sliderValue }) => {
  const [value, setValue] = useState(mean);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    onSliderChange(newValue);
  };

  function valuetext(value) {
    return `${value}%`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "small", width: "30%", textAlign: "start" }}>
        {name}
      </Typography>
      <Slider
        aria-label="Small"
        value={typeof value === "number" ? value : 0}
        getAriaValueText={valuetext}
        step={10}
        marks
        min={-90}
        max={300}
        onChange={handleSliderChange}
        sx={{ width: "70%" }}
      />
      <Typography sx={{ fontSize: "small", width: "10%", textAlign: "start" }}>
        {value}%
      </Typography>
    </Box>
  );
};

export default ScenerioSlider;
