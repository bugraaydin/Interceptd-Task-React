import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./Components/LandingPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ height: "100%" }}>
          <Route path="/" exact component={LandingPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
