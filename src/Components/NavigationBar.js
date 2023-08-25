import React, { useState } from "react";
import { Link } from "react-router-dom";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ViewInArTwoToneIcon from "@mui/icons-material/ViewInArTwoTone";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import CrisisAlertTwoToneIcon from "@mui/icons-material/CrisisAlertTwoTone";
import PollTwoToneIcon from "@mui/icons-material/PollTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import SpeedTwoToneIcon from "@mui/icons-material/SpeedTwoTone";
import NotListedLocationTwoToneIcon from "@mui/icons-material/NotListedLocationTwoTone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

/*
    Description: This component is used to display the navigation bar.

    Arguments: None

    Return Type: None
*/
const Navbar = () => {
  const [forecastAnchorEl, setForecastAnchorEl] = useState(null);
  const [homeAnchorEl, setHomeAnchorEl] = useState(null);
  const [scenariosAnchorEl, setScenariosAnchorEl] = useState(null);
  const [visualizationsAnchorEl, setVisualizationsAnchorEl] = useState(null);
  const [analyzeDataAnchorEl, setAnalyzeDataAnchorEl] = useState(null);
  const [uploadAnchorEl, setUploadAnchorEl] = useState(null);
  const [dashboardAnchorEl, setDashboardAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);

  const handleForecastMenuOpen = (event) => {
    setForecastAnchorEl(event.currentTarget);
  };

  const handleForecastMenuClose = () => {
    setForecastAnchorEl(null);
  };

  const handleHomeMenuOpen = (event) => {
    setHomeAnchorEl(event.currentTarget);
  };

  const handleHomeMenuClose = () => {
    setHomeAnchorEl(null);
  };

  const handleScenariosMenuOpen = (event) => {
    setScenariosAnchorEl(event.currentTarget);
  };

  const handleScenariosMenuClose = () => {
    setScenariosAnchorEl(null);
  };

  const handleVisualizationsMenuOpen = (event) => {
    setVisualizationsAnchorEl(event.currentTarget);
  };

  const handleVisualizationsMenuClose = () => {
    setVisualizationsAnchorEl(null);
  };

  const handleAnalyzeDataMenuOpen = (event) => {
    setAnalyzeDataAnchorEl(event.currentTarget);
  };

  const handleAnalyzeDataMenuClose = () => {
    setAnalyzeDataAnchorEl(null);
  };

  const handleUploadMenuOpen = (event) => {
    setUploadAnchorEl(event.currentTarget);
  };

  const handleUploadMenuClose = () => {
    setUploadAnchorEl(null);
  };

  const handleDashboardMenuOpen = (event) => {
    setDashboardAnchorEl(event.currentTarget);
  };

  const handleDashboardMenuClose = () => {
    setDashboardAnchorEl(null);
  };

  const handleHelpMenuOpen = (event) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleHelpMenuClose = () => {
    setHelpAnchorEl(null);
  };

  const isForecastMenuOpen = Boolean(forecastAnchorEl);
  const isHomeMenuOpen = Boolean(homeAnchorEl);
  const isScenariosMenuOpen = Boolean(scenariosAnchorEl);
  const isVisualizationsMenuOpen = Boolean(visualizationsAnchorEl);
  const isAnalyzeDataMenuOpen = Boolean(analyzeDataAnchorEl);
  const isUploadMenuOpen = Boolean(uploadAnchorEl);
  const isDashboardMenuOpen = Boolean(dashboardAnchorEl);
  const isHelpMenuOpen = Boolean(helpAnchorEl);

  return (
    <nav id="nav-bar">
      <div
        className="nav-bar-items"
        onMouseEnter={handleForecastMenuOpen}
        onMouseLeave={handleForecastMenuClose}
      >
        <BarChartTwoToneIcon className="nav-bar-icon" />
        Forecast
        <Menu
          anchorEl={forecastAnchorEl}
          open={isForecastMenuOpen}
          onClose={handleForecastMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link className="menu-link" to="/">
            <MenuItem onClick={handleForecastMenuClose}>Slider UX</MenuItem>
          </Link>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleForecastMenuClose}
          >
            Load top 5 Scenarios
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleForecastMenuClose}
          >
            Update Key Variables
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleForecastMenuClose}
          >
            Detailed Assumptions
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleHomeMenuOpen}
        onMouseLeave={handleHomeMenuClose}
      >
        <HomeTwoToneIcon className="nav-bar-icon" />
        Home
        <Menu
          anchorEl={homeAnchorEl}
          open={isHomeMenuOpen}
          onClose={handleHomeMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleHomeMenuClose}
          >
            Resource Levels and Mix
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleHomeMenuClose}
          >
            Productivity Drivers
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleHomeMenuClose}
          >
            Operational Outcomes
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleHomeMenuClose}
          >
            Pipeline State and Key Metrics
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleHomeMenuClose}
          >
            Tranches and Velocity Statistics
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div className="nav-bar-items">
        <ViewInArTwoToneIcon className="nav-bar-icon" />
        Run Simulation
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleScenariosMenuOpen}
        onMouseLeave={handleScenariosMenuClose}
      >
        <AssignmentTwoToneIcon className="nav-bar-icon" />
        Scenarios
        <Menu
          anchorEl={scenariosAnchorEl}
          open={isScenariosMenuOpen}
          onClose={handleScenariosMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleScenariosMenuClose}
          >
            20 Minute Survey
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleScenariosMenuClose}
          >
            Visual g2m Builder
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleScenariosMenuClose}
          >
            Upload Files and Refine {`(min 2)`}
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleScenariosMenuClose}
          >
            Calibrate Model
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleScenariosMenuClose}
          >
            Connect CRM
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div className="nav-bar-items">
        <AccountTreeTwoToneIcon className="nav-bar-icon" />
        Structure Module
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleVisualizationsMenuOpen}
        onMouseLeave={handleVisualizationsMenuClose}
      >
        <CrisisAlertTwoToneIcon className="nav-bar-icon" />
        Visualization
        <Menu
          anchorEl={visualizationsAnchorEl}
          open={isVisualizationsMenuOpen}
          onClose={handleVisualizationsMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleVisualizationsMenuClose}
          >
            Visualize System Dynamics
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleVisualizationsMenuClose}
          >
            Replay Historical Performance
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleVisualizationsMenuClose}
          >
            Constraining Factor Analysis
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleVisualizationsMenuClose}
          >
            Profile User Defined Tranches
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleAnalyzeDataMenuOpen}
        onMouseLeave={handleAnalyzeDataMenuClose}
      >
        <PollTwoToneIcon className="nav-bar-icon" />
        Analyze Data
        <Menu
          anchorEl={analyzeDataAnchorEl}
          open={isAnalyzeDataMenuOpen}
          onClose={handleAnalyzeDataMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleAnalyzeDataMenuClose}
          >
            Calculate Velocity Statistics
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleAnalyzeDataMenuClose}
          >
            Calculat Current Cost and Speed Statistics
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleAnalyzeDataMenuClose}
          >
            Journey Statistics for User Defined Tranches
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleAnalyzeDataMenuClose}
          >
            Route Path Statistics for User Defined Tranches
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleAnalyzeDataMenuClose}
          >
            AI Proposed Tranches and Route-path Statistics {`$1M`}
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleUploadMenuOpen}
        onMouseLeave={handleUploadMenuClose}
      >
        <UploadTwoToneIcon className="nav-bar-icon" />
        Upload Files
        <Menu
          anchorEl={uploadAnchorEl}
          open={isUploadMenuOpen}
          onClose={handleUploadMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link className="menu-link" to="/files">
            <MenuItem onClick={handleUploadMenuClose}>Manage Files</MenuItem>
          </Link>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleUploadMenuClose}
          >
            Simple Upload: Two Files With Dates
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleUploadMenuClose}
          >
            Multiple File Upload: Upload From Box File or Drive; Infer Dates or
            Tag
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleDashboardMenuOpen}
        onMouseLeave={handleDashboardMenuClose}
      >
        <SpeedTwoToneIcon className="nav-bar-icon" />
        Dashboard
        <Menu
          anchorEl={dashboardAnchorEl}
          open={isDashboardMenuOpen}
          onClose={handleDashboardMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            General Manager
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            Chief Revenue Officer
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            Sales
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            Sales Operations
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            Marketing
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            Channels
          </MenuItem>
          <MenuItem
            sx={{ color: "gray", cursor: "default" }}
            onClick={handleDashboardMenuClose}
          >
            Strategy
          </MenuItem>
        </Menu>
      </div>

      <p> | </p>

      <div
        className="nav-bar-items"
        onMouseEnter={handleHelpMenuOpen}
        onMouseLeave={handleHelpMenuClose}
      >
        <NotListedLocationTwoToneIcon className="nav-bar-icon" />
        Help
        <Menu
          anchorEl={helpAnchorEl}
          open={isHelpMenuOpen}
          onClose={handleHelpMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link className="menu-link" to="/help">
            <MenuItem onClick={handleHelpMenuClose}>FAQ</MenuItem>
          </Link>
          <a
            className="menu-link"
            href="https://www.kinetiksimulation.com"
            target="_blank"
            rel="noreferrer"
          >
            <MenuItem onClick={handleHelpMenuClose}>About Us</MenuItem>
          </a>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
