import React, { Component } from "react";

export default class Homepage extends Component {
  exit(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
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
