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
       Hi, I'm Ekundayo Shallom (Topinns) , a versatile full-stack developer with a passion for building innovative and user-friendly web applications. I developed my skills at <a className='text-[#6A98F0] hover:underline '  href="https://nhub-foundation-staging.netlify.app/about"> nHub Foundation </a> , where I gained a solid foundation in software development methodologies and best practices. Currently, I'm honing my expertise as a front-end developer intern at <a href="https://clocker.databoard.ai" className='text-[#6A98F0] hover:underline ' >Databoard Technologies</a>, where I'm hands-on with HTML, CSS, JavaScript, and frameworks like React. Through my coursework in computer science, I've gained a deeper understanding of programming principles and software development concepts. I've also acquired practical experience with various frontend frameworks and libraries, including Next JS, Tailwind CSS, and Chakra UI. I'm proficient in using Git, Github, and Agile methodologies to optimize website performance and enhance user experience. As a dedicated team player, I'm committed to delivering high-quality results, exceeding expectations, and continuously learning and growing as a developer.
        </Text>
        </Box>
       </Box>


    </Box>
  )
}

export default AboutHeader
