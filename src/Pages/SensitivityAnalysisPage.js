import React from "react";
import SearchAppBar from "../Components/SearchAppBar";
import NavigationBar from "../Components/NavigationBar";
import ModelVariablesList from "../Components/SensitivityAnalysisPageComponents/ModelVariablesList";

const SensitivityAnalysisPage = () => {
  return (
    <div>
      <SearchAppBar />
      <NavigationBar />
      <div className="sensitivity-analysis-page-layout">
        <h3 className="title">Sensitivity Analysis</h3>
        <ModelVariablesList />
      </div>
    </div>
  );
};

export default SensitivityAnalysisPage;
