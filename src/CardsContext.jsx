import { createContext, useContext, useReducer } from "react";
import data from "./data";

const CardsContext = createContext(null);

const CardsDispatchContext = createContext(null);

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
  } else if (action.type === 'hideFilterBox') {
    return {...state, isFilterOpen: false}
  }
}

const initialState = {
  cardsInfo: data,
  isFilterOpen: false,
  filterCoordinates: {},
};
