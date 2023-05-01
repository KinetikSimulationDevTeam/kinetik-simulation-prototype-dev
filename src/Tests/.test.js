import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DragDropFile from "../Components/DragDropFile";

describe("DragDropFile", () => {
  test("should render DragDropFile component", () => {
    const { container } = render(<DragDropFile />);
    expect(container).toMatchSnapshot();
  });

  test("should show selected file name when file is selected with click", async () => {
    const onActionMock = jest.fn();
    const { getByTestId } = render(<DragDropFile onAction={onActionMock} />);
    const file = new File(["file contents"], "test.csv", { type: 'text/csv' });
    const input = getByTestId("input-file");

    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(`Selected file - ${file.name}`)).toBeInTheDocument();
    expect(onActionMock).toHaveBeenCalledWith(file.name);
  });

  test("should show error message when no file is selected", async () => {
    const { getByTestId } = render(<DragDropFile />);
    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    expect(screen.getByText("Please select a file")).toBeInTheDocument();
  });

  test("should show success message when file is already uploaded", async () => {
    localStorage.setItem("KinetikDataSet", "test");
    const { getByTestId } = render(<DragDropFile />);
    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    expect(screen.getByText("File already uploaded")).toBeInTheDocument();
  });
});
