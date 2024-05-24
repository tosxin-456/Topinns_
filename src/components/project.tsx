import { Box, Text } from '@chakra-ui/react';
import { projects } from '../utils/projects';
import ProjectCard from './projectsCard';

interface ProjectsListProps {
  isLightMode: boolean;
}

const ProjectsList = ({ isLightMode }: ProjectsListProps) => {
  return (
    <Box>
      <Text className='text-3xl' textAlign="center" m="50px">Projects</Text>
      <Box
        display="flex"
        flexWrap="wrap"
        mt="15px"
        gap="5"
        width="80%"
        margin="auto"
        boxShadow="lg"
      >
        {projects.map((project) => (
          <ProjectCard key={project.index} project={project} isLightMode={isLightMode} />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectsList;
