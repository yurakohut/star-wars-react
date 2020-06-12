import React, { Component } from "react";

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import PeoplePage from "./../people-page/people-page";
import ItemList from "./../item-list/item-list";
import PersonDetails from "./../person-details/person-details";
import "./app.css";
import SwapiService from "./../../services/swapi-service";

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 5,
    hasError: false,
  };

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  };
  render() {
    return (
      <div className="app">
        <Header />
        <RandomPlanet />
        <PeoplePage />
      </div>
    );
  }
}
