import React, { Component } from "react";
import { logout } from "./UserFunctions";

export default class Homepage extends Component {
  exit(e) {
    logout().then((res) => {
      e.preventDefault();
      localStorage.removeItem("usersession");
    });
    this.props.history.push(`/login`);
  }
  render() {
    return (
      <div>
        Hoşgeldiniz
        <button onClick={this.exit.bind(this)}>Çıkış</button>
      </div>
    );
  }
}
