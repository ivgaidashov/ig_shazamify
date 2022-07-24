import { Text } from "@chakra-ui/react";

export default function Attribute(props) {
  return (
    <>
      <Text
        w="fit-content"
        color="white"
        border="1px"
        borderColor="purple.700"
        shadow="dark-lg"
        paddingRight={5}
        paddingLeft={2}
        marginTop={3}
        fontSize={props.textSize}
        borderRadius="md"
        _hover={{
          transform: "scale(1.05);",
        }}
        transitionDuration="200ms"
      >
        {props.name}
      </Text>
    </>
  );
}
