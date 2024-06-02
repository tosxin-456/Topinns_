import { Flex , VStack, Box, Text } from '@chakra-ui/react'
// import React from 'react'
// import { FaConnectdevelop } from "react-icons/fa";
// import { SiBackendless } from "react-icons/si";
// import { FaNode } from "react-icons/fa";
import { SiNestjs } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";

interface SkillsProps {
    isLightMode: boolean; // Assuming this prop is passed to Home component
  }


function Skillset({isLightMode}:SkillsProps) {
  return (
    <VStack>
        <Text className='text-3xl m-[50px]'>My SkillSet</Text>
      <Flex
      className=' w-[90%] '
      >
        <Box
        width={'47%'}
        marginRight={'auto'}
        // marginLeft={'10px'}
        marginTop={'25px'}
        // height={'230px'}
        // className='shadow-lg p-[10px] rounded-lg'
        className={`${isLightMode ?'bg-[white] text-black shadow-lg p-[20px] rounded-lg' :'bg-[#191A26] text-white p-[10px] shadow-lg rounded-lg'}`}
        >
        <Box
        margin={'auto'}
        width={'fit-content'}
        display={'flex'}
        >
        <SiNestjs className='w-[40px] h-[30px]  mr-auto' />
        <Text width={'fit-content'} className='text-[16px] ml-2 text-start flex'>
           Back-end Development Expertise
        </Text>
        </Box>    
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[15px] text-start lg:text-center '>
        Building robust and scalable server-side logic, I create efficient APIs and seamless user experiences
        </Text>
        </Box>
        <Box
        width={'47%'}
        marginLeft={'auto'}
        marginRight={'10px'}
        marginTop={'25px'}
        // height={'230px'}

        // className='shadow-lg p-[10px] rounded-lg'
        className={`${isLightMode ?'bg-[white] text-black shadow-lg p-[20px] rounded-lg' :'bg-[#191A26] text-white p-[10px] shadow-lg  rounded-lg'}`}
        >
            <Box
            margin={'auto'}
            width={'fit-content'}
            display={'flex'}
            height={'fit-content'}
            >
          <FaReact className='w-[40px] h-[30px] mr-auto' />
        <Text  className='text-[16px] text-start ml-2 '>
        Front-end Development Expertise
        </Text>
            </Box>
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[15px] text-start lg:text-center'>
        Crafting dynamic interfaces, I build fast, scalable, and accessible web applications, with React, Tailwind, etc.
        </Text>
        </Box>
      </Flex>
      <Box
        width={'80%'}
        marginTop={'30px'}
        // className='shadow-lg p-[10px] rounded-lg'
        className={`${isLightMode ?'bg-[white] text-black shadow-lg p-[15px] rounded-lg' :'bg-[#191A26] text-white p-[15px]  rounded-lg'}`}
        >
        <Box 
        margin={'auto'}
        width={'fit-content'}
        display={'flex'}
        // height={'30px'}
        >
        <SiGoogletagmanager className='w-[20px] h-[20px] mr-[5px] mt-[5px]' /> 
        <Text  className='text-[18px] text-center'>
          Management, Development and Maintenance
        </Text>
            </Box >
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[15px] text-center'>
        I streamline development workflows, foster collaborative teams, and deliver top-notch projects on schedule. When necessary, I also drive modernization efforts to ensure cutting-edge results.
        </Text>
        </Box>
    </VStack>
  )
}

export default Skillset
