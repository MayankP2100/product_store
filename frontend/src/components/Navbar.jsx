import {Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {MoonIcon, PlusSquareIcon, SunIcon} from "@chakra-ui/icons";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  return (<Container maxW="75vw" px={4}>
    <Flex
      h={16}
      alignItems="center"
      justifyContent="space-between"
      flexDir={{
        base: "column", sm: "row"
      }}>
      <Text
        fontSize={{base: "22", sm: "28"}}
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
      >
        <Link to={"/"}>Product Store 🛒</Link>
      </Text>
      <HStack spacing={2} alignItems={"center"}>
        <Link to="/create">
          <Button bg={useColorModeValue("gray.300", "gray.800")}>
            <PlusSquareIcon fontSize={20}/>
          </Button>
        </Link>
        <Button onClick={toggleColorMode} bg={useColorModeValue("gray.300", "gray.800")}>
          {colorMode === "dark" ? <SunIcon/> : <MoonIcon/>}
        </Button>
      </HStack>
    </Flex>
  </Container>);
}

export default Navbar;