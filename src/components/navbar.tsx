import React, { useState, useEffect } from 'react'
import { IoCloseSharp, IoSunny, IoMoon } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { Box,
     HStack,
     Text,
     Tabs, 
     TabList,
     TabPanels,
     Tab,
     TabPanel, 
     Button,
     useColorMode,
     Image,
     IconButton
 } from '@chakra-ui/react';
 import { SunIcon, MoonIcon } from '@chakra-ui/icons';

 
 
 function Navbar() {
     const [isLightMode, setIsLightMode] = useState(true);
     
     useEffect(() => {
        if (isLightMode) {
          document.body.style.backgroundColor = 'white';
          document.body.style.color = 'black';
        } else {
          document.body.style.backgroundColor = '#0B0E13';
          document.body.style.color = 'white';
        }
      }, [isLightMode]);
    
      const toggleColorMode = () => {
        setIsLightMode(prevMode => !prevMode);
      };

  return (
  <Box
//   background={'red'}
fontFamily="'Clash Display', sans-serif"
  display={'flex'}
  justifyContent={'space-between'}
  width={'100%'}
  position={'fixed'}
  fontSize={'19px'}
  className={`${isLightMode ?'bg-white shadow-md' :'bg-[#141613]'}`}
  padding={'5px'}
  

  >
  <Box 
  width={'30%'}
  textAlign={'center'}
  margin={'auto'}
  boxShadow={'2px'}
  color={'#6A98F0'}

  >
    Topinns
  </Box>
   <HStack
    // _hover={{ textDecoration: "underline" , cursor:'pointer'}}
   justifyContent={'space-between'}
   width={'70%'}
   marginRight={'0px'}
   padding={'5px'}
   fontFamily={'Clash-Display-light'}

   >
     <Text
    fontFamily="'Clash Display', sans-serif"
    _hover={{ textDecoration: "underline" , cursor:'pointer', color:'#6A98F0'}}
     
     >
       home
     </Text>
     <Text
    fontFamily="'Clash Display', sans-serif"
    _hover={{ textDecoration: "underline" , cursor:'pointer', color:'#6A98F0'}}
     
     >
        about me
     </Text>
     <Text
    fontFamily="'Clash Display', sans-serif"
    _hover={{ textDecoration: "underline" , cursor:'pointer', color:'#6A98F0'}}
     
     >projects</Text>
     <Text
    fontFamily="'Clash Display', sans-serif"
    _hover={{ textDecoration: "underline" , cursor:'pointer', color:'#6A98F0'}}
     
     >games</Text>
     <Text
    fontFamily="'Clash Display', sans-serif"
    _hover={{ textDecoration: "underline" , cursor:'pointer', color:'#6A98F0'}}
     
     >contact</Text>
     <Text
    fontFamily="'Clash Display', sans-serif"
    _hover={{ textDecoration: "underline" , cursor:'pointer', color:'#6A98F0'}}
     
     >blog</Text>
        <Box p={4}>
        <Button
      onClick={toggleColorMode}
      backgroundColor={`${isLightMode ?'#C7D0FF' :'#303030'}`}
      width={'100px'}
      height={'30px'}
      fontSize={'11px'}
      textAlign={'start'}
      borderRadius={'5px'}
      justifyContent={'start'}
      marginRight={'15px'}
    >
      {isLightMode ? (
        <Text
          textAlign={'center'}
          backgroundColor={'blue'}
          color={'white'}
          width={'40%'}
          marginLeft={'3px'}
          borderRadius={'5px'}
          bg="linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
          p={'2px'}
          fontFamily="'Clash Display', sans-serif"
        >
          Dark
        </Text>
      ) : (
        <Text
          textAlign={'center'}
          backgroundColor={'blue'}
          color={'white'}
          width={'40%'}
          marginRight={'5px'}
          marginLeft={'auto'}
          borderRadius={'5px'}
          bg="linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
          p={'2px'}
          fontFamily="'Clash Display', sans-serif"
        >
          Light
        </Text>
      )}
    </Button>
    </Box>

   </HStack>
 </Box>
  )
}

export default Navbar
