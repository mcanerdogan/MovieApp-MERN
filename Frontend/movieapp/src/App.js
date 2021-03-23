import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/homepage" component={Homepage} />
      </Router>
    );
  }
}

export default App;
