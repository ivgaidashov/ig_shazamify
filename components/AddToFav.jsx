import React, { useContext } from "react";

import { Flex, Box, Text, Grid, Button, Image } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

import { GlobalContext } from "../context/GlobalState";

export default function AddToFav(props) {
  const { addSongToFav, myFavSongs, removeSongFromFav } =
    useContext(GlobalContext);

  let storedSong = myFavSongs.find((object) => object.id === props.song.id);
  let isFav = storedSong ? true : false;

  console.log(props);
  
  return (
    <React.Fragment>
      {!isFav && (
        <Button
          leftIcon={<AiOutlineHeart />}
          colorScheme="pink"
          variant="solid"
          size="sm"
          onClick={() => addSongToFav(props.song)}
        >
          Add To Favourites
        </Button>
      )}
      {isFav && (
        <Button
          leftIcon={<AiOutlineHeart />}
          colorScheme="pink"
          variant="outline"
          size="sm"
          onClick={() => removeSongFromFav(props.song.id)}
        >
          Remove From Favourites
        </Button>
      )}
    </React.Fragment>
  );
}
