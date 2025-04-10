import { createContext, useReducer } from "react";
import { locations } from "../components/table/tableData";

export type Location = {
  id: string;
  location: string;
  name: string;
  adress: string;
  phone: string;
};

type LocationState = {
  locations: Location[];
};

export type LocationContextValue = LocationState & {
  addLocation: (location: Location) => void;
  updateLocation: (location: Location) => void;
  deleteLocation: (id: string) => void;
};

type AddLocationAction = {
  type: "ADD_LOCATION";
  payload: Location;
};
type UpdateLocationAction = {
  type: "UPDATE_LOCATION";
  payload: Location;
};

type DeleteLocationAction = {
  type: "DELETE_LOCATION";
  payload: string;
};
type LocationAction =
  | AddLocationAction
  | UpdateLocationAction
  | DeleteLocationAction;

const initialState: LocationState = {
  locations: locations,
};

export const LocationContext = createContext<LocationContextValue | null>(null);

function locationReducer(
  state: LocationState,
  action: LocationAction
): LocationState {
  if (action.type === "ADD_LOCATION") {
    const newState = {
      ...state,
      locations: [...state.locations, action.payload],
    };
    return newState;
  }
  if (action.type === "UPDATE_LOCATION") {
    const updatedState = {
      ...state,
      locations: state.locations.map((location) => {
        if (location.id === action.payload.id) {
          return action.payload;
        }
        return location;
      }),
    };
    return updatedState;
  }
  if (action.type === "DELETE_LOCATION") {
    const filteredState = {
      ...state,
      locations: state.locations.filter(
        (location) => location.id !== action.payload
      ),
    };
    return filteredState;
  }

  return state;
}

export default function LocationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locationState, dispatch] = useReducer(locationReducer, initialState);

  const ctx: LocationContextValue = {
    locations: locationState.locations,
    addLocation: (location: Location) => {
      dispatch({ type: "ADD_LOCATION", payload: location });
    },
    updateLocation: (location: Location) => {
      dispatch({ type: "UPDATE_LOCATION", payload: location });
    },
    deleteLocation: (id: string) => {
      dispatch({ type: "DELETE_LOCATION", payload: id });
    },
  };

  return (
    <LocationContext.Provider value={ctx}>{children}</LocationContext.Provider>
  );
}
