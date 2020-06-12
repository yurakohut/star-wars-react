import React, { Component } from "react";
import ItemList from "./../item-list/item-list";
import PersonDetails from "./../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "./../../services/swapi-service";

const Row = ({ left, right }) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">{left}</div>
      <div className="col-md-6">{right}</div>
    </div>
  );
};
export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 5,
    hasError: false,
  };

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { selectedPerson, hasError } = this.state;
    if (hasError) {
      return <ErrorIndicator />;
    }
    const itemList = (
      <ItemList
        onItemSelected={(id) => this.onPersonSelected(id)}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) =>
          `${name} (${gender}) - ${birthYear}`
        }
      />
    );

    const personDetails = <PersonDetails personId={selectedPerson} />;
    return <Row left={itemList} right={personDetails} />;
  }
}
