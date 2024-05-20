import React from 'react';
import {HStack, Text, VStack, Box, Image, Flex, Icon} from '@chakra-ui/react';
import line from '../assets/Line.svg';
import cv from '../assets/EKUNDAYO SHALLOM OSEJILO - CV.pdf'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";



interface FooterProps {
    isLightMode: boolean; // Example type definition
  }

function HomeSection({isLightMode}:FooterProps) {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = cv;
        link.setAttribute('download', 'EKUNDAYO SHALLOM OSEJILO - CV.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
  return (
    <VStack 
    height={'fit-content'}
    // background={'red'}
    className='text-xl mt-[200px] w-[80%] m-auto  ' >
    <Flex>
    <Image 
    height={'230px'}
    src={line}/>
    <Box
    ml={'10px'}
    >
     <h1
     className='text-lg ml-[4px] '
     >
        Hello, I'm
     </h1>
     <Text
     className='text-6xl'
     >
        Ekundayo Shallom
     </Text>
     <Text
     className='text-xl ml-[4px] mb-[15px]'
     >
     VERSATILE FULL-STACK WEB DEVELOPER
     </Text>
     <Box>
     <button
  className={`${isLightMode ? 'bg-yellow-300 text-md ml-[3px] text-black p-3 rounded-lg text-md' : 'bg-yellow-300 p-3 rounded-lg text-md ml-[3px] text-black'}`}
    
      onClick={()=>handleDownload()}>
        Download CV
      </button>

     </Box>
     <Flex className='mt-[5px]'>
     <FaGithub className="  w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      <FaLinkedin className=" w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      <FaXTwitter className=" w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      <MdOutlineEmail className="  w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />

     </Flex>
        </Box>
        </Flex>
    </VStack>
  )
}

export default HomeSection
