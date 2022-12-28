import { createContext, useContext, useReducer, useEffect } from "react";
import { nanoid } from "nanoid";

const CardsContext = createContext(null);

const CardsDispatchContext = createContext(null);

export function CardsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://63a921d6f4962215b58dc32e.mockapi.io/user")
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({
          type: "fetching",
          data: data.map((item) => ({
            ...item,
            id: nanoid(),
            isMyCard: false,
            isBlocked: false,
          })),
        })
      );
  }, []);

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
  switch (action.type) {
    case "fetching": {
      return {
        ...state,
        cardsInfo: action.data.slice(0, 10),
        totalCardsData: action.data,
      };
    }
    case "gettingCoordinates": {
      return {
        ...state,
        filterCoordinates: { top: action.top, left: action.left },
      };
    }
    case "displayingFilter": {
      return { ...state, isFilterOpen: true };
    }
    case "hideFilterBox": {
      return { ...state, isFilterOpen: false };
    }
    case "filteringCards": {
      const filterCardData = state.totalCardsData.filter((card) => {
        return (
          ((action.formdata.subscription &&
            card.card_type === "subscription") ||
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
    }
    case "searching": {
      return {
        ...state,
        searchText: action.text,
        cardsInfo: state.totalCardsData.filter((card) =>
          card.name.toLowerCase().includes(action.text.toLowerCase())
        ),
      };
    }
    case "gettingOwnerCard": {
      return {
        ...state,
        cardsInfo: state.totalCardsData.filter(
          (card) => card.ownerId === action.ownerID
        ),
      };
    }
    case "addToMyCard": {
      return {
        ...state,
        totalCardsData: state.totalCardsData.map((card) =>
          card.id === action.id
            ? { ...card, isMyCard: true, isBlocked: false }
            : card
        ),
        cardsInfo: state.cardsInfo.map((card) =>
          card.id === action.id
            ? { ...card, isMyCard: true, isBlocked: false }
            : card
        ),
      };
    }
    case "removeFromMyCard": {
      return {
        ...state,
        totalCardsData: state.totalCardsData.map((card) =>
          card.id === action.id ? { ...card, isMyCard: false } : card
        ),
        cardsInfo: state.cardsInfo.map((card) =>
          card.id === action.id ? { ...card, isMyCard: false } : card
        ),
      };
    }
    case "addToBlockedCards": {
      return {
        ...state,
        totalCardsData: state.totalCardsData.map((card) =>
          card.id === action.id
            ? { ...card, isBlocked: true, isMyCard: false }
            : card
        ),
        cardsInfo: state.cardsInfo.map((card) =>
          card.id === action.id
            ? { ...card, isMyCard: false, isBlocked: true }
            : card
        ),
      };
    }
    case "removeFromBlockedCards": {
      return {
        ...state,
        totalCardsData: state.totalCardsData.map((card) =>
          card.id === action.id ? { ...card, isBlocked: false } : card
        ),
        cardsInfo: state.cardsInfo.map((card) =>
          card.id === action.id ? { ...card, isBlocked: false } : card
        ),
      };
    }
    case "scrollingDown": {
      return {
        ...state,
        cardsInfo: [
          ...state.cardsInfo,
          ...[...state.totalCardsData].splice(state.cardsInfo.length, 10),
        ],
      };
    }
    case "turningHasMoreOff": {
      return { ...state, hasMoreItems: false };
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  cardsInfo: [],
  totalCardsData: [],
  isFilterOpen: false,
  filterCoordinates: {},
  formData: { subscription: true, burner: true, cardholder: "" },
  searchText: "",
  hasMoreItems: true,
};
