import React, { useState } from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter } from "react-icons/bs";
import { useCards, useCardsDispatch } from "../CardsContext";
import Filter from "./Filter";

export default function CardsList() {
  /* const [searchText, setSearchText] = useState('') */
  const state = useCards();
  const dispatch = useCardsDispatch();

  function handleSearch(e) {
    dispatch({ type: "searching", text: e.target.value });
  }

  function handleFilterBox(event) {
    const tempBtn = event.target.getBoundingClientRect();
    event.stopPropagation();
    let { top, left } = tempBtn;
    dispatch({ type: "gettingCoordinates", top, left });
    dispatch({ type: "displayingFilter" });
  }

  let cardsList = state.cardsInfo.map((item) => (
    <Card
      name={item.name}
      budget_name={item.budget_name}
      spent={item.spent.value}
      available_to_spend={item.available_to_spend.value}
      currency={"SGD"}
      owner_name={item.owner_name}
      card_type={item.card_type}
      expiry={item.expiry}
      key={item.id}
      limit={item.limit}
    />
  ));
  return (
    <main onClick={() => dispatch({ type: "hideFilterBox" })}>
      <div className="searchBar">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <input onChange={handleSearch} value={state.searchText} type="text" />
        </form>
        <button className="filter-button" onClick={handleFilterBox}>
          <BsFilter size={25} /> <div>Filter</div>
        </button>
      </div>
      <div className="cardsList">{cardsList}</div>
    </main>
  );
}
