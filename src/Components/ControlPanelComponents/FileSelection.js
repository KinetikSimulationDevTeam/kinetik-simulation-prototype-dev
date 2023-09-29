import React from "react";

const FileSelection = ({
  filesFromDdb,
  showConfirmationButtons,
  handleGoBackClick,
  handleConfirmSelectionClick,
}) => {
  return (
    <div>
      <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
        <select
          className="upload-module-ddb-dropdown"
          name="pipelineSummaryFileDdb"
          defaultValue="disabled"
        >
          <option value="disabled" disabled>
            Chosse Pipeline Summary File
          </option>
          {filesFromDdb
            .filter((file) => file.filetype === "Pipeline Summary")
            .map((file) => (
              <option key={file.id} value={file.body}>
                {"File Name: " +
                  file.title +
                  ", Time: " +
                  new Date(file.createdAt).toLocaleString()}
              </option>
            ))}
        </select>
        <select
          className="upload-module-ddb-dropdown"
          name="marketingInputFileDdb"
          defaultValue="disabled"
        >
          <option value="disabled" disabled>
            Chosse Marketing Input File
          </option>
          {filesFromDdb
            .filter((file) => file.filetype === "Marketing Input")
            .map((file) => (
              <option key={file.id} value={file.body}>
                {"File Name: " +
                  file.title +
                  ", Time: " +
                  new Date(file.createdAt).toLocaleString()}
              </option>
            ))}
        </select>
        {showConfirmationButtons && (
          <div>
            <button className="upload-button" onClick={handleGoBackClick}>
              Back
            </button>
            <button
              className="upload-button"
              onClick={(e) => {
                handleConfirmSelectionClick(e);
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FileSelection;
