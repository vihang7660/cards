import React, { useState } from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter, BsSearch } from "react-icons/bs";
import { useCards, useCardsDispatch } from "../CardsContext";

export default function BlockedCards() {
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);
  const state = useCards();
  const dispatch = useCardsDispatch();

  function searchCards(e) {
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

  function unblockCard(id) {
    dispatch({ type: "removeFromBlockedCards", id });
  }

  let blockedCardList = state.cardsInfo
    .filter((card) => card.isBlocked)
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
        isBlocked={item.isBlocked}
        blockedCardMessage={"Remove from Blocked cards"}
        handleBlockedCard={unblockCard}
        hideMyCardButton={true}
      />
    ));

  return (
    <main>
      <div className="searchBar">
        {isSearchBoxVisible ? (
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <input
              autoFocus={true}
              onChange={searchCards}
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
      <div className="cardsList">{blockedCardList}</div>
    </main>
  );
}
