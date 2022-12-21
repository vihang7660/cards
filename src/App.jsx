import React from "react";
import { useCards } from "./CardsContext";
import CardsList from "./components/CardsList";
import Filter from "./components/Filter";

export default function App() {
  const state = useCards();
  return (
    <>
      {state.isFilterOpen && <Filter />}
      <CardsList />
    </>
  );
}
