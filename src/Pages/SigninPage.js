import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Link } from "react-router-dom";
import Smile from "../Images/Smile.png";
import SearchAppBar from "../Components/SearchAppBar";
import Navbar from "../Components/NavigationBar";
import Copyright from "../Components/Copyright/Copyright";

const Signin = () => {
  return (
    <div>
      <SearchAppBar />
      <Navbar />
      <div id="authentication-text">
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <img src={Smile} alt="" width={100} height={100} />
              <h1>Welcome back, {user.attributes.name}!</h1>
              <h3>
                You are authenticated! Click <Link to="/">HERE</Link> to go back
                to the simulation.
              </h3>
              <button onClick={signOut} className="button">
                Sign Out
              </button>
            </div>
          )}
        </Authenticator>
      </div>
      <Copyright />
    </div>
  );
};

export default Signin;
