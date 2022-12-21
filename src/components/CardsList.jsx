import React, { useState } from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter } from "react-icons/bs";
import { useCards, useCardsDispatch } from "../CardsContext";
import Filter from "./Filter";

export default function CardsList() {
  const [isShowingFilter, setShowingFilter] = useState(false);

  const state = useCards();
  const dispatch = useCardsDispatch();

  function handleFilterBox(event) {
    const tempBtn = event.target.getBoundingClientRect();
    event.stopPropagation()
    let {top, left}  = tempBtn
    dispatch({type: 'gettingCoordinates', top, left})
    dispatch({type: 'displayingFilter'})
  }


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
    <main onClick={() => dispatch({type: 'hideFilterBox'})}>
      {isShowingFilter && <Filter />}
      <button className="filter-button" onClick={handleFilterBox}>
        <BsFilter size={25} /> <div>Filter</div>
      </button>
      <div className="cardsList">{cardsList}</div>
    </main>
  );
}
