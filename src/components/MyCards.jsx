import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./cardsList.css";
import { BsFilter, BsSearch } from "react-icons/bs";
import { useCards, useCardsDispatch } from "../CardsContext";
import Filter from "./Filter";

export default function MyCards() {
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);
  const state = useCards();
  const dispatch = useCardsDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!state.isFiltered) {
      dispatch({ type: "addingScrollData", page });
    }
  }, [page]);

  const handlescroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
  }, []);

  function handleSearch(e) {
    dispatch({ type: "searching", text: e.target.value });
  }

  function getOwner(ownerID) {
    dispatch({ type: "gettingOwnerCard", ownerID });
    dispatch({ type: "filteringOff" });
  }

  function handleFilterBox(event) {
    const tempBtn = event.target.getBoundingClientRect();
    event.stopPropagation();
    let { top, left } = tempBtn;
    dispatch({ type: "gettingCoordinates", top, left });
    dispatch({ type: "displayingFilter" });
  }

  function handleMyCard(id) {
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
        owner_id={item.owner_id}
        card_type={item.card_type}
        expiry={item.expiry}
        key={item.id}
        limit={item.limit}
        getOwner={getOwner}
        id={item.id}
        isMyCard={item.isMyCard}
        handleMyCard={handleMyCard}
        myCardMessage={"Remove from my cards"}
        hideBlockButton={true}
      />
    ));

  return (
    <main onClick={() => dispatch({ type: "hideFilterBox" })}>
      <div className="searchBar">
        {isSearchBoxVisible ? (
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <input
              autoFocus={true}
              onChange={(e) => {
                handleSearch(e);
                dispatch({ type: "filteringOff" });
              }}
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
        <button className="filter-button" onClick={handleFilterBox}>
          <BsFilter size={25} /> <div>Filter</div>
        </button>
      </div>
      <div className="cardsList">{cardsList}</div>
    </main>
  );
}
