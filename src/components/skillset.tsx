import { HStack, Flex , VStack, Box, Text } from '@chakra-ui/react'
import React from 'react'


interface SkillsProps {
    isLightMode: boolean; // Assuming this prop is passed to Home component
  }


function Skillset({isLightMode}:SkillsProps) {
  return (
    <VStack>
        <Text className='text-3xl'>My SkillSet</Text>
        <Box
        width={'50%'}
        // className='shadow-lg p-[10px] rounded-lg'
        className={`${isLightMode ?'bg-[white] text-black shadow-lg p-[15px] rounded-lg' :'bg-[#191A26] text-white p-[10px]  rounded-lg'}`}
        >
        <Text  className='text-[19px] text-center'>
           Front-end Development Expertise
        </Text>
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[13px] text-center'>
        Crafting dynamic interfaces, I build fast, scalable, and accessible web applications.
        </Text>
        </Box>
      <Flex>
        <Box
        width={'45%'}
        marginRight={'auto'}
        // className='shadow-lg p-[10px] rounded-lg'
        className={`${isLightMode ?'bg-[white] text-black shadow-lg p-[10px] rounded-lg' :'bg-[#191A26] text-white p-[7px]  rounded-lg'}`}
        >
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[17px] text-center'>
           Back-end Development Expertise
        </Text>
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[13px] text-center'>
        Building robust and scalable server-side logic, I create efficient APIs and seamless user experiences
        </Text>
        </Box>
        <Box
        width={'45%'}
        marginLeft={'auto'}
        // className='shadow-lg p-[10px] rounded-lg'
        className={`${isLightMode ?'bg-[white] text-black shadow-lg p-[10px] rounded-lg' :'bg-[#191A26] text-white p-[7px]  rounded-lg'}`}
        >
        <Text  className='text-[18px] text-center'>
           Management and Development
        </Text>
        <Text fontFamily='"Poppins", "sans-serif"' className='text-[13px] text-center'>
        I efficiently manage development workflows and collaborate with teams to deliver high-quality projects on time.
        </Text>
        </Box>
      </Flex>
    </VStack>
  )
}

export default Skillset
