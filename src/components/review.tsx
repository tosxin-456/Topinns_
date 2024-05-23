// import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { feedback } from '../utils/feedback'
import Reviews from './reviews'

interface SkillsProps {
    isLightMode: boolean; // Assuming this prop is passed to Home component
  }


function Review({isLightMode}:SkillsProps) {
  return (
    <Box>
        <Text className='text-3xl text-center mt-[30px]' >Reviews</Text>
     
    <Box
    display="flex"
    mt={{ base: "15", md: "5" }}
    gap="5"
    className={`${isLightMode ?'bg-[white] text-black scroll overflow-x-auto shadow-lg mt-[15px] p-[10px] rounded-lg' :'bg-[#191A26] text-white p-[10px] shadow-lg rounded-lg scroll overflow-x-auto mt-[15px] '}`}
    >
       {feedback.map((details) => (
                <Reviews key={details.index} data={details}/>
              ))}
    </Box>
    </Box>
  )
}

export default Review
