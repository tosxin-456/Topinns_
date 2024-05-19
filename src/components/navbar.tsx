import React from 'react'
import { IoCloseSharp, IoSunny, IoMoon } from "react-icons/io5";
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
    const { colorMode, toggleColorMode } = useColorMode();

  return (
  <Box
//   background={'red'}
  display={'flex'}
  justifyContent={'space-between'}
  width={'100%'}
  position={'fixed'}
  fontSize={'21px'}
  >
  <Box 
  width={'30%'}
  textAlign={'center'}
  >
    Logo
  </Box>
   <HStack
    // _hover={{ textDecoration: "underline" , cursor:'pointer'}}
   justifyContent={'space-between'}
   width={'70%'}
   background={'red'}
   marginRight={'0px'}
   padding={'5px'}
   >
     <Text
    _hover={{ textDecoration: "underline" , cursor:'pointer'}}
     
     >
       home
     </Text>
     <Text
    _hover={{ textDecoration: "underline" , cursor:'pointer'}}
     
     >
        about me
     </Text>
     <Text
    _hover={{ textDecoration: "underline" , cursor:'pointer'}}
     
     >projects</Text>
     <Text
    _hover={{ textDecoration: "underline" , cursor:'pointer'}}
     
     >games</Text>
     <Text
    _hover={{ textDecoration: "underline" , cursor:'pointer'}}
     
     >contact</Text>
     <Text
    _hover={{ textDecoration: "underline" , cursor:'pointer'}}
     
     >blog</Text>
        <Box p={4}>
      <Button 
      onClick={toggleColorMode}
    //    mb={4}
       backgroundColor={'#C7D0FF'}
       width={'100px'}
       height={'30px'}
       fontSize={'13px'}
       textAlign={'start'}
       borderRadius={'5px'}
       justifyContent={'start'}
       >
      <Text
      textAlign={'center'}
    //   backgroundColor={'linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)'}
      backgroundColor={'blue'}
      color={'white'}
      width={'50%'}
      marginLeft={'3px'}
      borderRadius={'5px'}
      bg="linear-gradient(134deg, #6A98F0 0%, #4961DC 99%)"
      p={'2px'}
      >
        Light
      </Text>
      </Button>
      {/* <Tabs variant="soft-rounded" colorScheme="red">
        <TabList>
        <IconButton
        aria-label="Toggle theme"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        mb={4}
      />
        </TabList>
      </Tabs> */}
    </Box>

   </HStack>
 </Box>
  )
}

export default Navbar
