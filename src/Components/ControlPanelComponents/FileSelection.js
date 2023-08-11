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
          name="filesDdb"
          defaultValue="disabled"
        >
          <option value="disabled" disabled>
            Choose From Uploaded File
          </option>
          {filesFromDdb.map((file) => (
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
