import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter, BsSearch } from "react-icons/bs";
import { useCards, useCardsDispatch } from "../CardsContext";

export default function MyCards() {
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);
  const state = useCards();
  const dispatch = useCardsDispatch();

  function handleSearch(e) {
    dispatch({ type: "searching", text: e.target.value });
    dispatch({ type: "turningHasMoreOff" });
  }

  function getOwnerCards(ownerID) {
    dispatch({ type: "gettingOwnerCard", ownerID });
    dispatch({ type: "turningHasMoreOff" });
  }

  function showFilterBox(event) {
    const tempBtn = event.target.getBoundingClientRect();
    event.stopPropagation();
    let { top, left } = tempBtn;
    dispatch({ type: "gettingCoordinates", top, left });
    dispatch({ type: "displayingFilter" });
  }

  function removeFromMyCards(id) {
    dispatch({ type: "removeFromMyCard", id });
  }

  let cardsList = state.cardsInfo
    .filter((card) => card.isMyCard)
    .map((item) => (
      <Card
        name={item.name}
        budget_name={item.budget_name}
        spent={item.spent.value}
        available_to_spend={item.available_to_spend.value}
        currency={"SGD"}
        owner_name={item.owner_name}
        ownerId={item.ownerId}
        card_type={item.card_type}
        expiry={item.expiry}
        key={item.id}
        limit={item.limit}
        getOwnerCards={getOwnerCards}
        id={item.id}
        isMyCard={item.isMyCard}
        handleMyCard={removeFromMyCards}
        myCardMessage={"Remove from my cards"}
        hideBlockButton={true}
      />
    ));

  return (
    <main>
      <div className="searchBar">
        {isSearchBoxVisible ? (
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <input
              autoFocus={true}
              onChange={handleSearch}
              value={state.searchText}
              type="text"
            />
          </form>
        ) : (
          <div
            className="searchIcon"
            onClick={() => setSearchBoxVisibility(true)}
          >
            <BsSearch size={20} />{" "}
          </div>
        )}
        <button className="filter-button" onClick={showFilterBox}>
          <BsFilter size={25} /> <div>Filter</div>
        </button>
      </div>
      <div className="cardsList">{cardsList}</div>
    </main>
  );
}
