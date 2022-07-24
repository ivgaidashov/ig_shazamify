import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  favSongs: [],
};

//create context
export const GlobalContext = createContext(initialState);

//provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    if(localStorage.getItem('favsongs'))
    dispatch({ type: "ADD_TO_INITIAL_STATE", payload: JSON.parse(localStorage.getItem('favsongs'))});
  }, []);

  //actions
  const addSongToFav = (song) => {
    dispatch({ type: "ADD_TO_FAVS", payload: song });
  };

  const removeSongFromFav = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVS", payload: id });
  };


  return (
    <GlobalContext.Provider
      value={{ myFavSongs: state.favSongs, addSongToFav, removeSongFromFav }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
