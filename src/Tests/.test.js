import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Navbar from "../Components/NavigationBar";
import Sliders from "../Components/ScenarioAnalysisComponents/ScenarioSliders";
import NewOpsModule from "../Modules/ScenarioAnalysisModule";
import { shallow } from "enzyme";
import ScenerioSlider from "../Components/ScenarioAnalysisComponents/ScenarioSlider";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactSlider from "react-slider";
import { MemoryRouter } from "react-router-dom";
import MyResponsiveScoreBoard from "../Components/ScoreboardComponents/ScoreboardBarChart";
import ResizeObserver from "resize-observer-polyfill";
import MyResponsiveBar from "../Components/SimulationComponents/SimulationBarChart";
import UploadModule from "../Modules/ControlPanelModule";
import Scoreboard from "../Modules/ScoreboardModule";
import SimulationModule from "../Modules/SimulationModule";

Enzyme.configure({ adapter: new Adapter() });
