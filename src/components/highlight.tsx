import React from 'react';
import { Box } from '@chakra-ui/react'; // Replace with your actual Box component import

interface FooterProps {
  isLightMode: boolean; // Example type definition
}

function Highlight({isLightMode}:FooterProps) {
  
  // JSX structure with <ul> and <li> elements
  return (
    <Box
    className={`${isLightMode ?'bg-[white] text-[#6A98F0] shadow-md' :'bg-[#141613]'}`}
    marginTop={'150px'}
    width={'400px'}
    height={'fit-content'}
    padding={'15px'}
    borderRadius={'7px'}
    color={'#6A98F0'}
    ml={'auto'}
    mr={'10%'}
    >
      <ul>
        <li>function <b>love</b>()  &#123;</li>
        <li>life.happiness += 10;</li>
        <li>console.log("Love is in the air! Happiness level: " + life.happiness);</li>
        <li>&#125;</li>

        <li>function lifeEvents(event) &#123;</li>
        <li>if (event === "love") &#123;</li>
        <li>love();</li>
        <li>&#125; else &#123;</li>
        <li>console.log("Life is okay, but happiness level remains: " + life.happiness);</li>
        <li>&#125;</li>
        
        <li>love();</li>
      </ul>
    </Box>
  );
}

export default Highlight;
