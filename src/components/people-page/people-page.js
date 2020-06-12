import React, { Component } from "react";
import ItemList from "./../item-list/item-list";
import PersonDetails from "./../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "./../../services/swapi-service";
import Row from "./../row/row";
import ErrorBoundry from './../error-boundry/error-boundry';
export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 5,
  };

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  };

  render() {
    const { selectedPerson } = this.state;

    const itemList = (
      <ItemList
        onItemSelected={(id) => this.onPersonSelected(id)}
        getData={this.swapiService.getAllPeople}
      >
        {(i) => `${i.name} - ${i.birthYear}`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={selectedPerson} />
      </ErrorBoundry>
    );
    return <Row left={itemList} right={personDetails} />;
  }
}
