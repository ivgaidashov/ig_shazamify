import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { data } from "../utils/dummy.js";
import Router from "next/router";
import TrackInfo from "../components/TrackInfo";

import { Flex, Grid, Box, Text, Image, Button } from "@chakra-ui/react";

import {
  baseUrl,
  baseUrl2,
  fetchApi,
  fetchApiYoutube,
} from "../utils/fetchApi";

import { BsArrowUpLeftSquare } from "react-icons/bs";
import Attribute from "../ui/attribute";
import AddToFav from "../components/AddToFav";

const backToHomepage = () => {
  Router.push("/");
};

export default function myFavTracks() {
  let [favTracks, setFavTracks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favsongs"))
      setFavTracks([...JSON.parse(localStorage.getItem("favsongs"))]);
  }, []);

  return (
    <Box>
      <Box w="1024px" m="auto">
        <Button
          leftIcon={<BsArrowUpLeftSquare />}
          colorScheme="twitter"
          variant="outline"
          onClick={backToHomepage}
          marginTop="25px"
        >
          Back to Homepage
        </Button>

        <Grid
          templateColumns="repeat(2, 1fr)"
          marginTop="10"
          gap={5}
          paddingBottom="10"
        >
          {favTracks.map((position, index) => (
            <TrackInfo
              img={position.img}
              artist={position.artist}
              title={position.title}
              alt={"pic"}
              id={position.id}
              key={position.id}
              appleMusic={position.appleMusic}
              dateAdded={position.dateAdded}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
