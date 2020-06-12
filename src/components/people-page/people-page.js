import React, { Component } from "react";
import ItemList from "./../item-list/item-list";
import PersonDetails from "./../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class PeoplePage extends Component {
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
      return <ErrorIndicator/>;
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={(id) => this.onPersonSelected(id)} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={selectedPerson} />
        </div>
      </div>
    );
  }
}
