import { Box, Text, Button } from '@chakra-ui/react';
import { projects } from '../utils/projects';
import ProjectCard from './projectsCard';
import { useState } from 'react';

interface ProjectsListProps {
  isLightMode: boolean;
}

const ProjectsList = ({ isLightMode }: ProjectsListProps) => {
  const [visibleProjects, setVisibleProjects] = useState(8);

  const handleSeeMore = () => {
    setVisibleProjects(projects.length);
  };

  const background = isLightMode ? "rgba(0, 0, 0, 0.01)" : "rgba(0, 0, 0, 0.01)";

  return (
    <Box position="relative">
      <Text className="text-3xl" textAlign="center" m="50px">Projects</Text>
      <Box
        display="flex"
        flexWrap="wrap"
        mt="15px"
        gap="5"
        margin="auto"
        boxShadow="lg"
        className="w-[95%] lg:w-[80%]"
      >
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard key={index} project={{ ...project, index }} isLightMode={isLightMode} />
        ))}
      </Box>
      {visibleProjects < projects.length && (
        <Box
          position="relative"
          mt="-65px" // Adjust as needed to create overlap
          mb="60px" // To give some space after the button
          width="100%"
          textAlign="center"
          background={background} // Conditional background
          backdropFilter="blur(10px)"
          zIndex="1"
          padding={'40px'}
        >
          <Button onClick={handleSeeMore} className='hover:underline text-[#6A98F0]'>
            See More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProjectsList;
