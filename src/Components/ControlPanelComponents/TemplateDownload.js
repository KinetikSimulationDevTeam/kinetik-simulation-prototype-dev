import React from "react";
import { Button } from "@mui/material";

const TemplateDownload = () => {
  return (
    <Button
      variant="contained"
      color="warning"
      size="medium"
      sx={{ fontSize: "10px", width: "100%", whiteSpace: "nowrap" }}
      component="a"
      href="https://docs.google.com/spreadsheets/d/1BFe5Zd3hNXDDj_UhxXslOETMXakupOt3WtGcI0YQkro/template/preview"
      target="_blank"
    >
      Download Template
    </Button>
  );
};

export default TemplateDownload;
