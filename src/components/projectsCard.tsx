import { Box, Image, Text, Link, Heading } from '@chakra-ui/react';
import { IconContext, IconType } from 'react-icons';

interface ProjectCardProps {
  project: {
    index: number;
    title: string;
    image: string;
    about: string;
    caseStudy: string;
    liveDemo: string;
    logo:string;
    git: { icon: IconType; url: string };
    languages: { icon: IconType; name: string }[];
  };
  isLightMode: boolean; // Moved isLightMode to be a direct prop
}

const ProjectCard = ({ project, isLightMode }: ProjectCardProps) => {
  return (
    <Box 
      margin="auto"
      borderRadius="lg"
      overflow="hidden"
      p="8"
      boxShadow="lg"
      className="flex lg:flex-row-reverse flex-col"
      >
      <Box 
      marginTop={"20px"}
      className="lg:w-[40%] shadow-lg lg:shadow-none p-3 rounded-md lg:mt-[-15px] lg:ml-[-110px] relative group"
      >
        <Image 
          src={project.image} 
          alt={project.title} 
          height="300px"
          width="100%"
          borderRadius="20px"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1" 
        />
      </Box>
      <Box
        paddingTop="40px"
        paddingBottom="40px"
        paddingRight="25px"
        paddingLeft="25px"
        className={`${isLightMode ? 'bg-[white] text-black scroll shadow-lg mt-[15px] p-[13px] rounded-lg' : 'bg-[#191A26] text-white p-[13px] shadow-lg rounded-lg scroll mt-[15px]'} lg:w-[55%]`}
      >
        <Image
        width={'60px'}
         src={project.logo}>
        </Image>
        <Heading size="md" mt="3" className="text-2xl">{project.title}</Heading>
        <Text
          fontFamily='"Poppins", "sans-serif"'
          mt="20px" mb="20px" className="text-sm lg:w-[80%]"
        >
          {project.about}
        </Text>
        <Box className="flex justify-between">
          <Box mt="2" className="flex">
            <Link href={project.liveDemo}>
              <Text
                padding="5px"
                margin="7px"
                className={`${isLightMode ? 'bg-yellow-300 text-sm lg:text-md ml-[3px] text-black p-3 rounded-md lg:text-md hover:scale-110' : 'bg-yellow-300 p-3 hover:scale-110 rounded-md text-sm lg:text-md ml-[3px] text-black'}`}
              >
                Live Demo
              </Text>
            </Link>
            <Link
              margin="auto"
              className="hover:scale-110"
              href={project.git.url} isExternal
            >
              <IconContext.Provider value={{ size: '1.6em' }}>
                <project.git.icon />
              </IconContext.Provider>
            </Link>
          </Box>
          <Box className="flex ml-auto mt-auto mb-auto" gap="7">
            {project.languages.map((language, index) => (
              <IconContext.Provider key={index} value={{ size: '1.45em' }}>
                <Box position="relative" className="group">
                  <language.icon />
                  <Text
                    opacity={0}
                    transition="opacity 0.2s"
                    className="absolute top-[-10] left-0 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-md pointer-events-none group-hover:opacity-100"
                  >
                    {language.name}
                  </Text>
                </Box>
              </IconContext.Provider>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;
