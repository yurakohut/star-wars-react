import React, { Component } from "react";

import "./item-list.css";
import SwapiService from "./../../services/swapi-service";
import Spinner from "./../spinner/spinner";
import withData from "./../hoc-helpers/with-data";

const ItemList = (props) => {
  const { data, onItemSelected } = props;

  const items = data.map((item) => {
    const { id } = item;

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {item.name}
      </li>
    );
  });

  return <ul className="item-list list-group">{items}</ul>;
};

const { getAllPeople } = new SwapiService();
export default withData(ItemList, getAllPeople);
