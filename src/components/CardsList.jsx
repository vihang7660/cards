import React from "react";
import Card from "./Card";
import data from "../data";
import { useCards } from "../CardsContext";

export default function CardsList() {
  const state = useCards();
  return state.cardsInfo.map((item) => (
    <Card
      name={item.name}
      budget_name={item.budget_name}
      spent={item.spent.value}
      available_to_spend={item.available_to_spend.value}
      currency={'SGD'}
      owner_name={item.owner_name}
      card_type={item.card_type.toUpperCase()}
      expiry={item.expiry}
      key={item.id}
    />
  ));
}
