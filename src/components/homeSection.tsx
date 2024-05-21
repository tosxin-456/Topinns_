// import React from 'react';
import { Text, VStack, Box, Image, Flex, } from '@chakra-ui/react';
import line from '../assets/Line.svg';
import cv from '../assets/EKUNDAYO SHALLOM OSEJILO - CV.pdf'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
// import { NavLink } from 'react-router-dom';



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
    className='text-xl mt-[70px] lg:mt-[200px] w-[80%] m-auto  ' >
    <Flex>
    <Image 
    height={'230px'}
    src={line}/>
    <Box
    ml={'10px'}
    >
     <h1
     className='text-md lg:text-lg ml-[4px] '
     >
        Hello, I'm
     </h1>
     <Text
     className='text-3xl lg:text-6xl'
     >
        Ekundayo Shallom
     </Text>
     <Text
     className='text-lg lg:text-xl ml-[4px] mb-[15px]'
     >
     VERSATILE FULL-STACK WEB DEVELOPER
     </Text>
     <Box>
     <button
  className={`${isLightMode ? 'bg-yellow-300 text-sm lg:text-md ml-[3px] text-black p-3 rounded-lg lg:text-md' : 'bg-yellow-300 p-3 rounded-lg text-sm lg:text-md ml-[3px] text-black'}`}
    
      onClick={()=>handleDownload()}>
        Download CV
      </button>

     </Box>
     <Flex className='mt-[5px]'>
      <a href='https://github.com/tosxin-456'>
     <FaGithub className="  w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      </a>
      <a href='https://www.linkedin.com/in/shallom-ekundayo-42bb35241/'>
      <FaLinkedin className=" w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      </a>
      <a href='https://twitter.com/shallomekundayo'>
      <FaXTwitter className=" w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      </a>
      <a href='mailto:tosinekshally@gmail.com'>
      <MdOutlineEmail className="  w-[50px] h-[30px] mt-[10px] transition duration-300 ease-in-out transform hover:scale-110" />
      </a>

     </Flex>
        </Box>
        </Flex>
    </VStack>
  )
}

export default HomeSection
