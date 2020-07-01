import React, { Component } from "react";

import Header from "../header/header";
import "./app.css";
import SwapiService from "./../../services/swapi-service";
import ItemDetails, { Record } from "./../item-details/item-details";
import Row from "./../row/row";

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
    const {
      getPerson,
      getStarship,
      getPersonImg,
      getStarshipImg,
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={5} getData={getPerson} getImageUrl={getPersonImg}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );
    const starshipDetails = (
      <ItemDetails
        itemId={9}
        getData={getStarship}
        getImageUrl={getStarshipImg}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Lenght" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
      <div className="app">
        <Header />
        {/* <RandomPlanet />
        <PeoplePage /> */}
        <Row left={personDetails} right={starshipDetails} />
      </div>
    );
  }
}
