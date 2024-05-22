// import React from 'react'

import {Text, Box , Image } from '@chakra-ui/react'
import profile from '../assets/profile images/profile1.jpg'



function AboutHeader() {
  return (
    <Box className=' w-[90%] m-auto lg:w-[80%] '>
         <Text className='text-3xl text-center mt-[30px] '>
          A Little 'bout {" "} <span className='text-[orange] shadow-sm' >Me</span> 
          </Text>
        <Box className='flex flex-col lg:flex-row' >
        <Box className='w-[50%] m-auto lg:w-[30%] lg:m-auto '>
       <Image
       borderRadius={'50%'}
       width={'100%'}
       margin={'auto'}
       mb={'10px'}
       mt={'15px'}
       src={profile} />
        </Box>
        <Box className='w-[100%] lg:w-[70%] '>
        <Text
        className='w-9/10 lg:w-[85%]'
        fontFamily='"Poppins", sans-serif'
        textAlign={'start'}
        margin={'auto'}
        mb={'10px'}
        mt={'15px'}
        >
      Hi, I'm Ekundayo Shallom (Topinns), a full-stack developer passionate about creating user-friendly web applications. I trained at <a href="https://nhub-foundation-staging.netlify.app/about" className='text-[#6A98F0] hover:underline' >nHub Foundation </a> and I am currently a front-end developer intern at <a href="https://clocker.databoard.ai" className='text-[#6A98F0] hover:underline' >Databoard Technologies</a> . I work with HTML, CSS, JavaScript, React, Express.js, Nest.js, Tailwind CSS, and Chakra UI. Proficient in Git, GitHub, and Agile methodologies, I focus on optimizing website performance and enhancing user experience. I'm dedicated to delivering high-quality results and continuously growing as a developer.
        </Text>
        </Box>
       </Box>


    </Box>
  )
}

export default AboutHeader
