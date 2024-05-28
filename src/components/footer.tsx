// import React, { useEffect, useState } from 'react';
import {
    // Box,
    Text, 
    // Image,
    HStack

} from '@chakra-ui/react';
// import logo from '../assets/Topinns.png'

interface FooterProps {
    isLightMode: boolean; // Example type definition
  }

function Footer({isLightMode}: FooterProps) {

  return (
  <HStack
//   bottom={0}
  
  fontSize={'15px'}
  className={`${isLightMode ?'bg-[#6A98F0] text-white shadow-md' :'bg-[#141613]'}`}
  padding={'5px'}
  justifyContent={'space-between'}
  fontFamily="'Clash Display', sans-serif"
  p={'10px'}
  mt={'50px'}
  >

   <Text
   width={'100%'}
     textAlign={'center'}
   >
    Created by <span  className={`${isLightMode ?'text-[#141613] ' :'bg-[#141613] text-[#6A98F0]'}`}> Ekundayo Shallom</span> All rights reserved © 2024
    </Text>
  </HStack>
  )
}

export default Footer
