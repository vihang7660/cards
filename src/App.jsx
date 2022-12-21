import React from "react";
import { useCards } from "./CardsContext";
import CardsList from "./components/CardsList";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import YourCards from "./components/YourCards";
import BlockedCards from "./components/BlockedCards";

export default function App() {
  const state = useCards();
  return (
    <>
      {state.isFilterOpen && <Filter />}
      <div className="page">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<CardsList />} />
            <Route path="yourcards" element={<YourCards />} />
            <Route path="blocked" element={<BlockedCards />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
