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
      spent={item.spent.value + item.spent.currency}
      available_to_spend={
        item.available_to_spend.value + item.available_to_spend.currency
      }
      key={item.id}
    />
  ));
}
