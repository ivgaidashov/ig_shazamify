import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Flex, Box, Text, Grid, Button, Image } from "@chakra-ui/react";
import { SiApplemusic } from "react-icons/si";
import AddToFav from "./AddToFav"

/*import { AiOutlineHeart } from "react-icons/ai";

import { GlobalContext } from "../context/GlobalState";*/

export default function TrackInfo(props) {
  /*const { addSongToFav, myFavSongs, removeSongFromFav } =
    useContext(GlobalContext);

  let storedSong = myFavSongs.find((object) => object.id === props.id);
  let isFav = storedSong ? true : false;
  console.log(myFavSongs)*/

  return (
    <React.Fragment>
      <Flex>
        <Link href={`/song/${props.id}`} passHref>
          <Image
            src={props.img}
            width={200}
            height={200}
            alt={props.pic}
            borderRadius="base"
            cursor="pointer"
          />
        </Link>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
          paddingLeft={5}
        >
          {props.position && <Text fontSize="3xl">{props.position}</Text>}
          {props.dateAdded && <Text fontSize="1xl">Liked on {props.dateAdded}</Text>}
          <Box p={0}>
            <Text fontSize="xl" as="em">
              {props.artist}
            </Text>
            <Text fontSize="lg">{props.title}</Text>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="center"
            color="purple.50"
            paddingTop={2}
          >
            <SiApplemusic />
            <a href={`${props.appleMusic}`} target="_blank">
              <Text cursor="pointer" marginLeft={1} color="pink.700">
                Listen On Apple Music
              </Text>
            </a>
          </Flex>
          <AddToFav song={{...props, "dateAdded": new Date().toJSON().slice(0,10).replace(/-/g,'/')}}/>
        </Flex>
      </Flex>
    </React.Fragment>
  );
}
