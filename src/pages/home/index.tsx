import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Highlight from '../../components/highlight';
import HomeSection from '../../components/homeSection';
import Topskills from '../../components/topskills';

interface HomeProps {
  isLightMode: boolean; // Assuming this prop is passed to Home component
}

function Home({ isLightMode }: HomeProps) {
  return (
    <Box fontFamily="'Clash Display', sans-serif">
     <Box className='flex flex-col lg:flex-row' >
        <HomeSection isLightMode={isLightMode} /> {/* Pass isLightMode prop to HomeSection */}
        <Highlight isLightMode={isLightMode} /> {/* Pass isLightMode prop to Highlight */}
      </Box>
        <Topskills/> 
    </Box>
  );
}

export default Home;
