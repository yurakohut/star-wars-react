import React, { Component } from "react";

import "./person-details.css";
import SwapiService from "./../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    isLoading: true,
  };

  componentWillMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.personId !== this.props.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    this.setState({ isLoading: true });
    if (!personId) {
      return;
    }
    this.swapiService
      .getPerson(personId)
      .then((person) => this.setState({ person, isLoading: false }));
  }

  render() {
    const { isLoading, person } = this.state;
    if (!person) {
      return <Spinner />;
    }
    const spinner = isLoading ? <Spinner /> : null;
    const content = !isLoading ? <DetailsView personDetails={person} /> : null;

    // const { id, name, gender, birthYear, eyeColor } = this.state.person;
    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

const DetailsView = ({ personDetails }) => {
  const { id, name, gender, birthYear, eyeColor } = personDetails;
  console.log(name);

  return (
    <>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="person"
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
