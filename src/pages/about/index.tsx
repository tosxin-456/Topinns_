// import React from 'react'
import {Box} from '@chakra-ui/react'
import AboutHeader from '../../components/about'
import Skillset from '../../components/skillset'
import ProgrammingExpertise from '../../components/programmingExpertise';
interface FooterProps {
  isLightMode: boolean; 
}


function About({isLightMode}:FooterProps) {
 

  return (
    <Box fontFamily="'Clash Display', sans-serif" id='aboutUs'>
    <AboutHeader/>
    <Skillset isLightMode={isLightMode}/>
    <ProgrammingExpertise/>
    </Box>
  )
}

export default About
