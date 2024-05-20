import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Highlight from '../../components/highlight';
import HomeSection from '../../components/homeSection';

interface HomeProps {
  isLightMode: boolean; // Assuming this prop is passed to Home component
}

function Home({ isLightMode }: HomeProps) {
  return (
    <Box fontFamily="'Clash Display', sans-serif">
      <Flex flexDirection={{ base: 'row', md: 'column' }}>
        <HomeSection isLightMode={isLightMode} /> {/* Pass isLightMode prop to HomeSection */}
        <Highlight isLightMode={isLightMode} /> {/* Pass isLightMode prop to Highlight */}
      </Flex>
    </Box>
  );
}

export default Home;
