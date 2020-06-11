import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import "./random-planet.css";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    isLoading: true,
  };

  componentDidMount() {
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, isLoading: false });
  };

  updatePlanet() {
    const id = 7;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded);
  }

  render() {
    const { planet, isLoading } = this.state;
    const content = isLoading ? <Spinner /> : <PlanetView planet={planet} />;

    return <div className="random-planet jumbotron rounded">{content}</div>;
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
