// import React from 'react'
import {Text , Box} from '@chakra-ui/react'
import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiChakraui } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiJupyter } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io5";
import { SiExpress } from "react-icons/si";


function ProgrammingExpertise() {
  return (
    <Box>
      <Text className='text-3xl text-center m-[50px] ' >
         My  Expertise
      </Text>
      <Box
      justifyContent={'space-between'}
      className='flex w-3/4 lg:w-1/2  m-auto mt-[20px]' >
      <FaHtml5  className='h-[65px] w-[65px] m-[5px]' />
      <FaCss3Alt className='h-[65px] w-[65px] m-[5px]'/>
       <IoLogoJavascript className='h-[65px] w-[65px] m-[5px]' />
      </Box>
      <Box
      justifyContent={'space-between'}
      className='flex w-3/4 lg:w-1/2  m-auto mt-[20px]' >
      <FaNode  className='h-[65px] w-[65px] m-[5px]' />
      <FaReact className='h-[65px] w-[65px] m-[5px]'/>
       <SiMongodb className='h-[65px] w-[65px] m-[5px]' />
      </Box>
      <Box
      justifyContent={'space-between'}
      className='flex w-3/4 lg:w-1/2 m-auto mt-[20px]' >
      <SiTypescript  className='h-[65px] w-[65px] m-[5px]' />
      <SiTailwindcss className='h-[65px] w-[65px] m-[5px]'/>
       <FaFigma className='h-[65px] w-[65px] m-[5px]' />
      </Box>
      <Box
      justifyContent={'space-between'}
      className='flex w-3/4 lg:w-1/2 m-auto mt-[20px]' >
      <SiChakraui  className='h-[65px] w-[65px] m-[5px]' />
      <FaPython className='h-[65px] w-[65px] m-[5px]'/>
       <SiJupyter className='h-[65px] w-[65px] m-[5px]' />
      </Box>
      <Box
      justifyContent={'space-between'}
      className='flex w-3/4 lg:w-1/2 m-auto mt-[20px]' >
       <IoLogoGithub className='h-[65px] w-[65px] m-[5px]' />
       <SiExpress className='h-[65px] w-[65px] m-[5px]'/>
      </Box>
    </Box>
  )
}

export default ProgrammingExpertise
