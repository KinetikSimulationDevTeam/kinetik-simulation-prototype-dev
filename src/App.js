import "./App.css";
import MainFrame from "./Pages/MainFrame";
import { Authenticator } from "@aws-amplify/ui-react";

/*
    Description: This component is used to display the main frame of the application.

    Arguments: None

    Return Type: None
*/
function App() {
  return (
    <div className="App">
      <Authenticator.Provider>
        <MainFrame />
      </Authenticator.Provider>
    </div>
  );
}

export default App;
