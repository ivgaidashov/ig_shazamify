import React, { useEffect } from "react";
import Router from "next/router";

import { uuid } from "uuidv4";
import {
  Flex,
  Box,
  Text,
  Image,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  baseUrl,
  baseUrl2,
  fetchApi,
  fetchApiYoutube,
} from "../../utils/fetchApi";
import { dataSong } from "../../utils/dummySong.js";
import {
  capitalizeFirstLetter,
  removeHyphens,
  capitalizeEveryWord,
  getShorter,
} from "../../utils/usefulFunctions";

import Attribute from "../../ui/attribute";
import AddToFav from "../../components/AddToFav";
import { BiPlayCircle } from "react-icons/bi";
import { BsArrowUpLeftSquare } from "react-icons/bs";

const backToHomepage = (event) => {
  event.preventDefault;
  Router.push("/");
};

export default function Song({ trackDetails, videoDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let d = trackDetails.releasedate.split("-");
  let releaseDate = d[0] + "." + d[1] + "." + d[2];

  const lyrics = trackDetails.sections[1].text
    ? trackDetails.sections[1].text
    : ["Lyrics Not Found"];
  console.log(trackDetails);

  const singers = getShorter(
    trackDetails.artists.map((artist, key, arr) => {
      /*artist.alias+', '*/
      return key + 1 === arr.length
        ? capitalizeEveryWord(removeHyphens(artist.alias))
        : capitalizeEveryWord(removeHyphens(artist.alias)) +
            ", ";
    })
  );

  const forFav = {
    img: trackDetails.images.coverarthq,
    artist: singers,
    title: trackDetails.alias,
    alt: "pic",
    id: trackDetails.key,
    key: trackDetails.key,
    appleMusic: trackDetails.hub.options[0].actions[0].uri,
  };

  return (
    <Box width="100%" h="100%" position="relative">
      <Box height="300px" m="auto" bg="purple.900">
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
      </Box>
      <Box
        height="400px"
        w="1024px"
        /*bg="green.900"*/
        position="absolute"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Flex height="100%">
          <Box position="relative">
            <Image
              src={trackDetails.images.coverarthq}
              height="auto"
              width="auto"
              alt="alt"
              borderRadius="base"
              shadow="dark-lg"
              /*_hover={{
                transform: "scale(1.05);"
              }}
              transitionDuration="300ms"*/
            />
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              opacity="0"
              _hover={{
                opacity: "1;",
              }}
              transitionDuration="200ms"
            >
              <a
                href={`${trackDetails.hub.options[0].actions[0].uri}`}
                target="_blank" rel="noreferrer"
              >
                <BiPlayCircle color="pink" size="150px" />
              </a>
            </Box>
          </Box>
          <Box position="relative" height="100%">
            <Box
              /*bg="red.500"*/
              position="absolute"
              top="0"
              height="50%"
              width="624px"
            >
              <Box paddingLeft={5}>
                <Flex alignItems="center">
                  <Attribute
                    name={getShorter(
                      capitalizeEveryWord(removeHyphens(trackDetails.title))
                    )}
                    textSize="3xl"
                  ></Attribute>
                  <Text paddingLeft="3" color="pink.50" marginTop={5} as="i">
                    by
                  </Text>
                </Flex>
                <Attribute
                  name={singers}
                  textSize="3xl"
                ></Attribute>
                <Box marginTop={3}>
                  <Text paddingLeft="0" color="pink.50">
                    {trackDetails.genres.primary}
                  </Text>{" "}
                </Box>
                <Box marginTop={1}>
                  <Text paddingLeft="0" color="pink.50">
                    {releaseDate}
                  </Text>{" "}
                </Box>
              </Box>
            </Box>
            <Box
              /*bg="white"*/
              position="absolute"
              top="50%"
              height="50%"
              width="624px"
            >
              <Box paddingLeft={5} paddingTop={4}>
                <Text fontWeight={700}>
                  {trackDetails.sections[0].metadata[0].text}
                </Text>
              </Box>

              <Box paddingLeft={5} paddingTop={4}>
                <Text fontWeight={700}>
                  {trackDetails.sections[0].metadata[1].text}
                </Text>
              </Box>

              <Box paddingLeft={5} paddingTop={4}>
                <Text>{trackDetails.sections[1].footer}</Text>
              </Box>
              <Flex paddingLeft={5} paddingTop={4}>
                <AddToFav song={{...forFav, "dateAdded": new Date().toJSON().slice(0,10).replace(/-/g,'/')}} />
                <Box>
                  <Button marginLeft={2} size="sm" onClick={onOpen}>
                    Show The Lyrics
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>
                        {capitalizeEveryWord(removeHyphens(trackDetails.title))}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {lyrics.map((line) => {
                          return <Text key={uuid()}>{line}</Text>;
                        })}
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box height="400px" m="auto" w="1024px" marginTop="250px">
        <Flex justifyContent="space-between">
          {videoDetails.map((video) => {
            return (
              <Box
                as="iframe"
                key={uuid()}
                src={`https://www.youtube.com/embed/${video.id}`}
                width="49%"
                sx={{
                  aspectRatio: "16/9",
                }}
              />
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/v1/tracks/details?track_id=${id}`);
  /*dataSong; */

  const data1 = await fetchApiYoutube(
    baseUrl2,
    data.title + "+" + data.subtitle
  );

  return {
    props: {
      trackDetails: data,
      videoDetails: data1.results.slice(0, 2),
    },
  };
}
