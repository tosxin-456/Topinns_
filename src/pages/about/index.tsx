// import React from 'react'
import {Box} from '@chakra-ui/react'
import AboutHeader from '../../components/about'
import Skillset from '../../components/skillset'

interface FooterProps {
  isLightMode: boolean; 
}


function About({isLightMode}:FooterProps) {
 

  return (
    <Box fontFamily="'Clash Display', sans-serif">
      
    <AboutHeader/>
    <Skillset isLightMode={isLightMode}/>
    </Box>
  )
}

export default About
