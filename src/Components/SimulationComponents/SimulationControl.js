import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Slider from "@mui/material/Slider";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const SimulationControl = ({
  decreasePlaybackSpeed,
  increasePlaybackSpeed,
  isPlaying,
  togglePlay,
  sliderValue,
  handleSliderChange,
  data,
}) => {
  return (
    <div>
      <div className="simulation-auto-play">
        <div className="simulation-playback-speed">
          <FastRewindIcon
            onClick={decreasePlaybackSpeed}
            sx={{ cursor: "pointer" }}
          />
          {!isPlaying ? (
            <PlayCircleIcon onClick={togglePlay} sx={{ cursor: "pointer" }} />
          ) : (
            ""
          )}
          {isPlaying ? (
            <StopCircleIcon onClick={togglePlay} sx={{ cursor: "pointer" }} />
          ) : (
            ""
          )}
          <FastForwardIcon
            onClick={increasePlaybackSpeed}
            sx={{ cursor: "pointer" }}
          />
        </div>
        <Slider
          aria-label="Default"
          min={0}
          defaultValue={0}
          max={data.length - 1}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default SimulationControl;
