import React from "react";
import { useCards } from "../CardsContext";

export default function Card({ name, budget_name, spent, available_to_spend }) {
  const state = useCards();

  fetch("https://api.npoint.io/81b674b9cd5b084349ba/").then(resp => resp.json()).then(info => console.log(info))
  return (
    <section className="card-container">
      <h2>{name}</h2>
      <p>{budget_name}</p>
      <p>{spent}</p>
      <p>{available_to_spend}</p>
    </section>
  );
}
