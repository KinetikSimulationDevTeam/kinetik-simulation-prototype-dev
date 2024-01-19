import { Box, Typography } from "@mui/material";
import React from "react";

const Copyright = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright
        {" © "}
        {new Date().getFullYear()}
        {" KinetikSimulation. All rights reserved."}
      </Typography>
    </Box>
  );
};

export default Copyright;
