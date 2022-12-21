import React from "react";
import { useCards } from "../CardsContext";
import "./filter.css";

export default function Filter() {
  const [subscription, setSubscription] = React.useState(false);
  const [burner, setBurner] = React.useState(false);
  const [cardholder, setCardholder] = React.useState("");
  const state = useCards()

  // Event handler functions to update the state variables when the form elements are changed
  const handleSubscriptionChange = (event) => {
    setSubscription(event.target.checked);
  };

  const handleBurnerChange = (event) => {
    setBurner(event.target.checked);
  };

  const handleCardholderChange = (event) => {
    setCardholder(event.target.value);
  };

  return (
    <form style={{top: state.filterCoordinates.top + 40, left: state.filterCoordinates.left - 200}}>
      <label>Type</label>
      <div>
        <input
          type="checkbox"
          checked={subscription}
          onChange={handleSubscriptionChange}
        />
        Subscription
      </div>
      <div>
        <input type="checkbox" checked={burner} onChange={handleBurnerChange} />
        Burner
      </div>
      <label>Cardholder</label>
      <div>
        <select value={cardholder} onChange={handleCardholderChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <button type="submit">Apply</button>
        <button type="reset">Clear</button>
      </div>
    </form>
  );
}
