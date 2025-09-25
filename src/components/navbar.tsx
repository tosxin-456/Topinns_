import { useState, useEffect } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import {
  Box,
  HStack,
  Text,
  Button,
  VStack,
  IconButton
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  isLightMode: boolean;
  toggleColorMode: () => void;
}

function Navbar({ isLightMode, toggleColorMode }: FooterProps) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 790);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateToSection = (sectionId: string) => {
  if (window.location.pathname !== "/") {
    // go to home first
    navigate("/", { replace: false });
    // wait for navigation before scrolling
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <Flex>
      <Box
        fontFamily="'Clash Display', sans-serif"
        display={
          "flex" //   background={'red'}
        }
        justifyContent={"space-between"}
        width={"100%"}
        position={"fixed"}
        top={0}
        mb={"200px"}
        fontSize={"19px"}
        className={`${isLightMode
          ? "bg-white color-black  "
          : "bg-[#141613]  "}`}
        padding={"5px"}
        zIndex={99}
      >
        <Text
          width={"30%"}
          textAlign={"center"}
          margin={"auto"}
          boxShadow={"2px"}
          color={"#6A98F0"}
        >
          Topinns
        </Text>
        {!isMobile
          ? <HStack
              justifyContent={
                "space-between" // _hover={{ textDecoration: "underline" , cursor:'pointer'}}
              }
              width={"70%"}
              marginRight={"0px"}
              padding={"5px"}
              fontFamily={"Clash-Display-light"}
            >
              <Text
                fontFamily="'Clash Display', sans-serif"
  onClick={() => navigateToSection("home")}
  cursor="pointer"
  _hover={{ textDecoration: "underline", color: "#6A98F0" }}

              >
                home
              </Text>
              <Text
                fontFamily="'Clash Display', sans-serif"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#6A98F0"
                }}
                textAlign={"center"}
      onClick={() => navigateToSection("about")}
              >
                about me
              </Text>
              <Text
                fontFamily="'Clash Display', sans-serif"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#6A98F0"
                }}
      onClick={() => navigateToSection("projects")}

              >
                projects
              </Text>
              <Text
                fontFamily="'Clash Display', sans-serif"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#6A98F0"
                }}
              >
                games
              </Text>
              <Text
                fontFamily="'Clash Display', sans-serif"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#6A98F0"
                }}
              >
                contact
              </Text>
              <Text
                onClick={() => navigate("/blog")}
                fontFamily="'Clash Display', sans-serif"
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#6A98F0"
                }}
              >
                blog
              </Text>
              <Box p={4}>
                <Button
                  onClick={toggleColorMode}
                  backgroundColor={isLightMode ? "#C7D0FF" : "#303030"}
                  width="120px"
                  height="30px"
                  fontSize="12px"
                  borderRadius="8px"
                  p="2px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  fontFamily="'Clash Display', sans-serif"
                >
                  <Flex
                    flex="1"
                    h="100%"
                    align="center"
                    justify="center"
                    borderRadius="6px"
                    bg={
                      isLightMode
                        ? "linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
                        : "transparent"
                    }
                    color={isLightMode ? "white" : "gray.300"}
                    fontWeight="500"
                  >
                    Dark
                  </Flex>
                  <Flex
                    flex="1"
                    h="100%"
                    align="center"
                    justify="center"
                    borderRadius="6px"
                    bg={
                      !isLightMode
                        ? "linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
                        : "transparent"
                    }
                    color={!isLightMode ? "white" : "gray.700"}
                    fontWeight="500"
                  >
                    Light
                  </Flex>
                </Button>
              </Box>
            </HStack>
          : <Box>
              <Box width={"50px"} m={"auto"}>
                <IconButton
                  aria-label="Open Menu"
                  variant="ghost"
                  size="lg"
                  color={isLightMode ? "black" : "white"}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  onClick={onToggle}
                />
              </Box>
            </Box>}
      </Box>
      <Box>
        {isOpen &&
          <VStack
            textAlign={"center"}
            color="#000"
            position="fixed"
            mt="2em"
            pt="1.5em"
            top="36px"
            right="0"
            width="100%"
            zIndex={
              99 //  spacing={4} // backgroundColor={'white'}
            }
            className={`${isLightMode
              ? "bg-white color-black shadow-md "
              : "bg-[#141613] text-white "}`}
            boxShadow="md"
            marginTop={"10px"}
            fontSize={"20px"}
            pb={"1em"}
          >
            <Button
              onClick={toggleColorMode}
              backgroundColor={`${isLightMode ? "#C7D0FF" : "#303030"}`}
              width={"100px"}
              height={"30px"}
              fontSize={"11px"}
              textAlign={"start"}
              borderRadius={"5px"}
              justifyContent={"start"}
              marginRight={"15px"}
            >
              {isLightMode
                ? <Text
                    textAlign={"center"}
                    backgroundColor={"blue"}
                    color={"white"}
                    width={"40%"}
                    marginLeft={"3px"}
                    borderRadius={"5px"}
                    bg="linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
                    p={"2px"}
                    fontFamily="'Clash Display', sans-serif"
                  >
                    <MoonIcon />
                  </Text>
                : <Text
                    textAlign={"center"}
                    backgroundColor={"blue"}
                    color={"white"}
                    width={"40%"}
                    marginRight={"5px"}
                    marginLeft={"auto"}
                    borderRadius={"5px"}
                    bg="linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
                    p={"2px"}
                    fontFamily="'Clash Display', sans-serif"
                  >
                    <SunIcon />
                  </Text>}
            </Button>
            <Text
              fontFamily="'Clash Display', sans-serif"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6A98F0"
              }}
              className={`${isLightMode
                ? "bg-white color-black  "
                : "bg-[#141613] text-white "}`}
              as="a"
               onClick={() => navigateToSection("home")}

            >
              home
              {/* <FaCheck/> */}
            </Text>
            <Text
              fontFamily="'Clash Display', sans-serif"
              className={`${isLightMode
                ? "bg-white color-black  "
                : "bg-[#141613] text-white "}`}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6A98F0"
              }}
              textAlign={"center"}
                onClick={() => navigateToSection("about")}

            >
              about me
            </Text>
            <Text
              fontFamily="'Clash Display', sans-serif"
              className={`${isLightMode
                ? "bg-white color-black  "
                : "bg-[#141613] text-white "}`}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6A98F0"
              }}
      onClick={() => navigateToSection("projects")}

            >
              projects
            </Text>
            <Text
              fontFamily="'Clash Display', sans-serif"
              className={`${isLightMode
                ? "bg-white color-black  "
                : "bg-[#141613] text-white "}`}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6A98F0"
              }}
            >
              games
            </Text>
            <Text
              fontFamily="'Clash Display', sans-serif"
              className={`${isLightMode
                ? "bg-white color-black "
                : "bg-[#141613] text-white "}`}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6A98F0"
              }}
            >
              contact
            </Text>
            <Text
              onClick={() => navigate("/blog")}
              fontFamily="'Clash Display', sans-serif"
              className={`${isLightMode
                ? "bg-white color-black  "
                : "bg-[#141613] text-white "}`}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6A98F0"
              }}
            >
              blog
            </Text>
          </VStack>}
      </Box>
    </Flex>
  );
}

export default Navbar;
