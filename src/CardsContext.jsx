import { createContext, useContext, useReducer } from "react";
import data from "./data";

const CardsContext = createContext(null);

const CardsDispatchContext = createContext(null);

const cardsData = data.map((item) => ({
  ...item,
  isMyCard: false,
  isBlocked: false,
}));

export function CardsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CardsContext.Provider value={state}>
      <CardsDispatchContext.Provider value={dispatch}>
        {children}
      </CardsDispatchContext.Provider>
    </CardsContext.Provider>
  );
}

export function useCards() {
  return useContext(CardsContext);
}

export function useCardsDispatch() {
  return useContext(CardsDispatchContext);
}

function reducer(state, action) {
  if (action.type === "gettingCoordinates") {
    return {
      ...state,
      filterCoordinates: { top: action.top, left: action.left },
    };
  } else if (action.type === "displayingFilter") {
    return { ...state, isFilterOpen: true };
  } else if (action.type === "hideFilterBox") {
    return { ...state, isFilterOpen: false };
  } else if (action.type === "filteringCards") {
    const filterCardData = state.fixedCardData.filter((card) => {
      return (
        ((action.formdata.subscription && card.card_type === "subscription") ||
          (action.formdata.burner && card.card_type === "burner")) &&
        (!action.formdata.cardholder ||
          card.owner_name === action.formdata.cardholder)
      );
    });

    return {
      ...state,
      formData: action.formdata,
      cardsInfo: filterCardData,
    };
  } else if (action.type === "searching") {
    return {
      ...state,
      searchText: action.text,
      cardsInfo: state.fixedCardData.filter((card) =>
        card.name.toLowerCase().includes(action.text.toLowerCase())
      ),
    };
  } else if (action.type === "gettingOwnerCard") {
    return {
      ...state,
      cardsInfo: state.fixedCardData.filter(
        (card) => card.owner_id === action.ownerID
      ),
    };
  } else if (action.type === "addingScrollData") {
    return {
      ...state,
      cardsInfo: [...state.fixedCardData.slice(0, action.page * rows)],
    };
  } else if (action.type === "filteringOff") {
    return { ...state, isFilterOpen: false, isFiltered: true };
  } else if (action.type === "addToMyCard") {
    return {
      ...state,
      cardsInfo: state.cardsInfo.map((card) =>
        card.id === action.id ? { ...card, isMyCard: true, isBlocked: false } : card
      ),
      fixedCardData: state.fixedCardData.map((card) =>
        card.id === action.id ? { ...card, isMyCard: true, isBlocked: false } : card
      ),
    };
  } else if (action.type === "removeFromMyCard") {
    return {
      ...state,
      cardsInfo: state.cardsInfo.map((card) =>
        card.id === action.id ? { ...card, isMyCard: false } : card
      ),
      fixedCardData: state.fixedCardData.map((card) =>
        card.id === action.id ? { ...card, isMyCard: false } : card
      ),
    };
  } else if (action.type === "addToBlockedCards") {
    return {
      ...state,
      cardsInfo: state.cardsInfo.map((card) =>
        card.id === action.id ? { ...card, isBlocked: true, isMyCard: false } : card
      ),
      fixedCardData: state.fixedCardData.map((card) =>
        card.id === action.id ? { ...card, isBlocked: true, isMyCard: false } : card
      ),
    };
  } else if (action.type === "removeFromBlockedCards") {
    return {
      ...state,
      cardsInfo: state.cardsInfo.map((card) =>
        card.id === action.id ? { ...card, isBlocked: false } : card
      ),
      fixedCardData: state.fixedCardData.map((card) =>
        card.id === action.id ? { ...card, isBlocked: false } : card
      ),
    };
  }
}

const rows = 5;

const initialState = {
  cardsInfo: cardsData.slice(0, 5),
  fixedCardData: cardsData,
  isFilterOpen: false,
  filterCoordinates: {},
  formData: { subscription: true, burner: true, cardholder: "" },
  searchText: "",
  isFiltered: false,
};
