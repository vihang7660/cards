import React from "react";
import { useCards, useCardsDispatch } from "./CardsContext";
import CardsList from "./components/CardsList";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCards from "./components/MyCards";
import BlockedCards from "./components/BlockedCards";
import Header from "./components/Header";

export default function App() {
  const state = useCards();
  return (
    <>
      {state.isFilterOpen && <Filter />}
      <div className="page">
        <BrowserRouter>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<CardsList />} />
            <Route path="mycards" element={<MyCards />} />
            <Route path="blocked" element={<BlockedCards />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
