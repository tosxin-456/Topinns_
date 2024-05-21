import React from 'react';
import { Box } from '@chakra-ui/react'; // Replace with your actual Box component import

interface FooterProps {
  isLightMode: boolean; // Example type definition
}

function Highlight({isLightMode}:FooterProps) {
  
  // JSX structure with <ul> and <li> elements
  return (
    <Box
    className={`${isLightMode ?'bg-[white] text-[#3b5994] shadow-lg' :'bg-[#141613]'}  m-auto mt-[20px] text-[15px] lg:ml-auto lg:mt-[150px] lg:mr-[10%] p-[15px] w-[60%] lg:w-[400px] rounded-[7px] text-start `}
    // width={'400px'}
    height={'fit-content'}
    color={'#6A98F0'}
    >
      <ul className= {`${isLightMode ? 'text-[#3b5994]':'text-[#6A98F0]'}`} >
        <li>function <b>love</b>()  &#123;</li>
        <li> <b>life.</b>happiness += 10;</li>
        <li>console.log("Love is in the air! Happiness level: " + life.happiness);</li>
        <li>&#125;</li>

        <li>function lifeEvents(event) &#123;</li>
        <li>if (event === "love") &#123;</li>
        <li>love();</li>
        <li>&#125; else &#123;</li>
        <li>console.log("Life is okay, but happiness level remains: " + life.happiness);</li>
        <li>&#125;</li>
        
        <li><b>love();</b></li>
      </ul>
    </Box>
  );
}

export default Highlight;
