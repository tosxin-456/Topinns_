import { Box} from '@chakra-ui/react';
// import React from 'react';
import Highlight from '../../components/highlight';
import HomeSection from '../../components/homeSection';
// import Topskills from '../../components/topskills';
import ReadmeStats from '../../components/reameStats';



interface HomeProps {
  isLightMode: boolean; // Assuming this prop is passed to Home component
}

function Home({ isLightMode }: HomeProps) {
  return (
    <Box fontFamily="'Clash Display', sans-serif">
     <Box className='flex flex-col lg:flex-row' >
        <HomeSection isLightMode={isLightMode} /> 
        <Highlight isLightMode={isLightMode} /> 
      </Box>
        <ReadmeStats/>
    </Box>
  );
}

export default Home;
