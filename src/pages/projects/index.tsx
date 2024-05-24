// import React from 'react'
import {Box} from '@chakra-ui/react'
import ProjectsList from '../../components/project';


interface ProjectProps {
    isLightMode: boolean; 
}


function Projects({isLightMode}:ProjectProps) {
 
    
    return (
        <Box fontFamily="'Clash Display', sans-serif" id='aboutUs'>
        <ProjectsList isLightMode={isLightMode}  />
        </Box>
  )
}

export default Projects
