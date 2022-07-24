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

export default function GlobalSharts() {
  const countries =
    "DE,PT,US,IT,MX,AU,NL,NO,RU,FI,JP,FR,BR,SE,GB,CA,KR,CN".split(",");

  const [clickedCountry, setClickedCountry] = useState("");
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getPositions = async () => {
      const charts =await fetchApi(`${baseUrl}/v1/charts/country`, clickedCountry);
        /*data*/
      setPositions(charts);
    };

    getPositions(); // run it, run it
  }, [clickedCountry]);

  const flagClicked = (country) => {
    setClickedCountry(country);
    console.log(clickedCountry);
  };

  console.log("rendered");

  return (
    <Box width="100%" h="100%" position="relative">
      <Box height="auto" m="auto" bg="purple.900">
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
        </Box>

        <Box paddingTop="50px" paddingBottom="70px" width="1024px" m="auto">
          <Grid
            templateColumns="repeat(6, 1fr)"
            columnGap="40px"
            rowGap="30px"
            paddingLeft=""
          >
            {countries.map((country) => {
              return (
                <Flex
                  key={country}
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  border="2px"
                  borderRadius="3xl"
                  shadow="xl"
                  borderColor="purple.900"
                  padding="5px"
                  backgroundColor={
                    country === clickedCountry ? "purple.600" : "purple.800"
                  }
                  transform={
                    country === clickedCountry ? "scale(1.1)" : "scale(1)"
                  }
                  transitionDuration="200ms"
                  _hover={{
                    transform: "scale(1.15)",
                    backgroundColor: "purple.700",
                  }}
                  cursor="pointer"
                  onClick={() => flagClicked(country)}
                >
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={country}
                    marginRight="10px"
                    style={{
                      width: "4em",
                      height: "4em",
                      borderRadius: "15px",
                      filter: "brightness(95%)",
                    }}
                    svg
                  />
                  <Text color="pink.50">{country}</Text>
                </Flex>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Grid
        width="1024px"
        templateColumns="repeat(2, 1fr)"
        m="auto"
        marginTop="10"
        paddingBottom="10"
        gap={5}
      >
        {positions &&
          positions
            .slice(0, 10)
            .map((position, index) => (
              <TrackInfo
                img={position.images.coverarthq}
                position={index + 1}
                artist={position.subtitle}
                title={position.title}
                alt={"pic"}
                id={position.key}
                key={position.key}
                appleMusic={position.hub.options[0].actions[0].uri}
              />
            ))}
      </Grid>
    </Box>
  );
}
