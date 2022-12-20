import React from "react";
import { useCards } from "../CardsContext";
import "./card.css";
import { BsDot } from "react-icons/bs";
import { GiBurningEye } from "react-icons/gi";

export default function Card({
  name,
  budget_name,
  spent,
  available_to_spend,
  owner_name,
  expiry,
  card_type,
}) {
  const state = useCards();
  let capacity = available_to_spend + spent;

  return (
    <section className="card-container">
      <div className="header">
        <h2>{name}</h2>
        <div className="owner-info">
          {owner_name} <BsDot /> {budget_name}
        </div>
        <GiBurningEye className="logo" size={35} />
      </div>

      <div className="card-type">
        <div className="type">{card_type}</div>
        <div>Expires: {expiry}</div>
      </div>

      <div className="capacity-visualization">
        <div
          className="spent-bar"
          style={{ width: `${(spent / capacity) * 100}%`, background: "red" }}
        />
        <div
          className="available-to-spend-bar"
          style={{
            width: `${(available_to_spend / capacity) * 100}%`,
            background: "green",
          }}
        />
      </div>

      <div className="spent">
        <div>Spent</div>
        <BsDot color="red" size={45} />
        <div className="currency">{spent} SGD</div>
      </div>

      <div className="availabe">
        <div>Available to spend</div>
        <BsDot color="green" size={45} />
        <div className="currency">{available_to_spend} SGD</div>
      </div>
    </section>
  );
}
