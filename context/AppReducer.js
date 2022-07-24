export default (state, action) => {
  switch (action.type) {
    case "ADD_TO_INITIAL_STATE":
      return {
        ...state,
        favSongs: [...action.payload],
      };

    case "ADD_TO_FAVS":
      localStorage.removeItem("favsongs");
      const toLocalStorage = [action.payload, ...state.favSongs];
      localStorage.setItem("favsongs", JSON.stringify(toLocalStorage));
      return {
        ...state,
        favSongs: [action.payload, ...state.favSongs],
      };

    case "REMOVE_FROM_FAVS":
      console.log(action.payload);
      localStorage.setItem("favsongs", JSON.stringify(state.favSongs.filter(song => song.id !== action.payload)));
      return {
        ...state,
        favSongs: state.favSongs.filter(song => song.id !== action.payload),
      };
      
    default:
      return state;
  }
};
