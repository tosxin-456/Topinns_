import { Box, Text, Button } from '@chakra-ui/react';
import { projects } from '../utils/projects';
import ProjectCard from './projectsCard';
import { useEffect, useState } from 'react';

interface ProjectsListProps {
  isLightMode: boolean;
}

const ProjectsList = ({ isLightMode }: ProjectsListProps) => {
  const [visibleProjects, setVisibleProjects] = useState(8);
 const [count, setCount] = useState(0);
    useEffect(
      () => {
        let counter = 0;
        const interval = setInterval(() => {
          if (counter < projects.length) {
            setCount(prev => prev + 1);
            counter++;
          } else {
            clearInterval(interval);
          }
        }, 50); // Adjust speed of counting
        return () => clearInterval(interval);
      },
      [projects.length]
    );

  const handleSeeMore = () => {
    setVisibleProjects(projects.length);
  };

  const background = isLightMode ? "rgba(0, 0, 0, 0.01)" : "rgba(0, 0, 0, 0.01)";

  return <Box position="relative">
      <Text className="text-3xl" textAlign="center" m="50px">
        Projects
      </Text>
      <Box display="flex" flexWrap="wrap" mt="15px" gap="5" margin="auto" boxShadow="lg" className="w-[95%] lg:w-[80%]">
        {projects
          .slice(0, visibleProjects)
          .map((project, index) =>
            <ProjectCard
              key={index}
              project={{ ...project, index }}
              isLightMode={isLightMode}
            />
          )}
      </Box>
      {visibleProjects < projects.length && <Box position="relative" mt="-65px" mb="60px" width="100%" textAlign="center" background={background // Adjust as needed to create overlap // To give some space after the button
          } backdropFilter="blur(10px)" zIndex="1" padding={"40px" // Conditional background
          }>
          <Button onClick={handleSeeMore} className="hover:underline text-[#6A98F0]">
            See More
          </Button>
        </Box>}
    </Box>;
};

export default ProjectsList;
