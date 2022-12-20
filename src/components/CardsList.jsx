import React from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter } from "react-icons/bs";
import { useCards } from "../CardsContext";

export default function CardsList() {
  const state = useCards();

  let cardsList = state.cardsInfo.map((item) => (
    <Card
      name={item.name}
      budget_name={item.budget_name}
      spent={item.spent.value}
      available_to_spend={item.available_to_spend.value}
      currency={"SGD"}
      owner_name={item.owner_name}
      card_type={item.card_type.toUpperCase()}
      expiry={item.expiry}
      key={item.id}
    />
  ));
  return (
    <main>
      <button className="filter-button">
        <BsFilter size={25} /> <div>Filter</div>
      </button>
      <div className="cardsList">{cardsList}</div>
    </main>
  );
}
