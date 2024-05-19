import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
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
 } from '@chakra-ui/react';






function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
  <Box
//   background={'red'}
  display={'flex'}
  justifyContent={'space-evenly'}
  width={'100%'}
  position={'fixed'}
  fontSize={'21px'}
  >
  <Box 
  >
    Logo
  </Box>
   <HStack
    // _hover={{ textDecoration: "underline" , cursor:'pointer'}}
   justifyContent={'space-between'}
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
      <Button onClick={toggleColorMode} mb={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Light</Tab>
          <Tab>Dark</Tab>
        </TabList>
      </Tabs>
    </Box>

   </HStack>
 </Box>
  )
}

export default Navbar
