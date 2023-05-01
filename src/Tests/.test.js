import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DragDropFile from "../Components/DragDropFile";
import NavigationBar from "../Components/NavigationBar";
import Sliders from "../Components/Sliders";
import NewOpsModule from "../Modules/NewOpsModule";

describe("DragDropFile", () => {
    test("should render DragDropFile component", () => {
        render(<DragDropFile />);
    });
});

describe("NavigationBar", () => {
    test("should render NavigationBar component", () => {
        render(<NavigationBar />);
    });
});

describe("Sliders", () => {
    test("should render Sliders component", () => {
        render(<Sliders />);
    });
});

describe("NewOpsModule", () => {
    test("should render NewOpsModule component", () => {
        render(<NewOpsModule />);
    });
});
