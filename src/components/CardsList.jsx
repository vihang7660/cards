import React, { useState } from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter, BsSearch } from "react-icons/bs";
import { useCards, useCardsDispatch } from "../CardsContext";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CardsList() {
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);
  const state = useCards();
  const dispatch = useCardsDispatch();

  function fetchMoreData() {
    if (state.cardsInfo.length >= 41) {
      dispatch({ type: "turningHasMoreOff" });
      return;
    }

    setTimeout(() => {
      dispatch({ type: "scrollingDown" });
    }, 1500);
  }

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

  function addToMyCards(id) {
    dispatch({ type: "addToMyCard", id });
  }

  function blockCard(id) {
    dispatch({ type: "addToBlockedCards", id });
  }

  let cardsList = state.cardsInfo.map((item) => (
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
      handleMyCard={addToMyCards}
      id={item.id}
      isMyCard={item.isMyCard}
      myCardMessage={"Added to my cards"}
      isBlocked={item.isBlocked}
      blockedCardMessage={"Blocked"}
      handleBlockedCard={blockCard}
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
      <div className="cardsList">
        <InfiniteScroll
          dataLength={state.cardsInfo.length}
          next={fetchMoreData}
          hasMore={state.hasMoreItems}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {cardsList}
        </InfiniteScroll>
      </div>
    </main>
  );
}
