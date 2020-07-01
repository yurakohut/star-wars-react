import React, { Component } from "react";

import "./item-details.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}:</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    isLoading: true,
    image: null,
  };

  componentWillMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    this.setState({ isLoading: true });
    if (!itemId) {
      return;
    }
    getData(itemId).then((item) =>
      this.setState({ item, isLoading: false, image: getImageUrl(item) })
    );
  }

  render() {
    const { isLoading, item, image } = this.state;
    console.log(this.props.children);

    if (!item) {
      return <Spinner />;
    }
    const spinner = isLoading ? <Spinner /> : null;
    const content = !isLoading ? (
      <DetailsView
        item={item}
        image={image}
        propsChildren={this.props.children}
      />
    ) : null;

    // const { id, name, gender, birthYear, eyeColor } = this.state.person;
    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

const DetailsView = ({ item, image, propsChildren }) => {
  const { id, name, gender, birthYear, eyeColor } = item;
  return (
    <>
      <img className="item-image" src={image} alt="person" />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(propsChildren, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    </>
  );
};
