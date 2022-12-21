import React, { useState } from "react";
import { useCards, useCardsDispatch } from "../CardsContext";
import { nanoid } from "nanoid";
import "./filter.css";

export default function Filter() {
  const state = useCards();
  const [filterFormData, setFormData] = useState({
    subscription: state.formData.subscription,
    burner: state.formData.burner,
    cardholder: state.formData.cardholder,
  });

  const dispatch = useCardsDispatch();

  function handleFormDataChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleResetForm(e) {
    e.preventDefault()
    setFormData({ subscription: true, burner: true, cardholder: "" })
  }

  function handleSubmit() {
    dispatch({ type: "filteringCards", formdata: filterFormData });
  }

  let ownerNameList = [
    ...new Set(state.fixedCardData.map((card) => card.owner_name)),
  ];

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        top: state.filterCoordinates.top + 40,
        left: state.filterCoordinates.left - 200,
      }}
    >
      <label>Type</label>
      <div>
        <input
          type="checkbox"
          name="subscription"
          checked={filterFormData.subscription}
          onChange={handleFormDataChange}
        />
        Subscription
      </div>
      <div>
        <input
          type="checkbox"
          name="burner"
          checked={filterFormData.burner}
          onChange={handleFormDataChange}
        />
        Burner
      </div>
      <label>Cardholder</label>
      <div>
        <select
          value={filterFormData.cardholder}
          name="cardholder"
          onChange={handleFormDataChange}
        >
          <option key={nanoid()} value="">
            {"Choose Cardholder"}
          </option>
          {ownerNameList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Apply
        </button>
        <button type="reset" onClick={handleResetForm}>Clear</button>
      </div>
    </form>
  );
}
