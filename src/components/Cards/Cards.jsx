import React from "react";
import Card from "./Card/Card";
import "./_cards.scss";

const CardsComponent = ({ children }) => {
  return <div className='cards-container'>{children}</div>;
};

export default CardsComponent;
CardsComponent.Card = Card;
