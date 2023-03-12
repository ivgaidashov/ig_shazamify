import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Flex, Box, Text, Grid, Button } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

import TrackInfo from "../components/TrackInfo";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { data } from "../utils/dummy.js";

export default function Home({ chartsResponse }) 

{console.log(chartsResponse);
console.log('hey');
  return (
    <Box maxWidth="1280px" m="auto">
      <Box
        bg="purple.900"
        roundedBottomLeft="3xl"
        roundedBottomRight="3xl"
        boxShadow="dark-lg"
        height="200px"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Grid
            templateColumns="repeat(3, 1fr)"
            w="100%"
            alignItems="center"
            justifyContent="space-around"
          >
            <Flex alignItems="center" justifyContent="center" gap={2}>
              <AiOutlineHeart color="pink" />
              <Link href={`/favourites`} passHref>
                <Text fontSize="xl" color="pink.100" cursor="pointer">
                  My Favourites
                </Text>
              </Link>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Text
                fontSize="7xl"
                color="pink.50"
                fontWeight="bold"
                marginLeft={5}
                marginRight={5}
              >
                Shazamify
              </Text>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Link href={`/global_charts`} passHref>
                <Text fontSize="xl" color="pink.100" cursor="pointer">
                  Global Charts
                </Text>
              </Link>
            </Flex>
          </Grid>
          <Text fontSize="xl" color="pink.50">
            Track The Most Searched-for Tracks of the World
          </Text>
        </Flex>
      </Box>
      <Grid
        templateColumns="repeat(2, 1fr)"
        marginTop="10"
        gap={5}
        paddingBottom="10"
      >
        {chartsResponse.map((position, index) => (
          <TrackInfo
            img={!!position.images?.coverarthq ? position.images.coverarthq : 'noImage' }
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

export async function getStaticProps() {
  const charts = /*data;*/ await fetchApi(`${baseUrl}/v1/charts/world`);
  console.log(charts)

  return {
    props: {
      chartsResponse: charts,
    },
      revalidate: 3600,
  };
}
