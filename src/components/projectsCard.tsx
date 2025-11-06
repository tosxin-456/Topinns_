import { Box, Image, Text, Link, Heading, keyframes } from "@chakra-ui/react";
import { IconContext, IconType } from "react-icons";

interface ProjectCardProps {
  project: {
    index: number;
    title: string;
    image: string | { type: string; src: string };
    about: string;
    caseStudy: string;
    liveDemo: string;
    logo: string;
    git: { icon: IconType; url: string };
    languages: { icon: IconType; name: string }[];
  };
  isLightMode: boolean;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const ProjectCard = ({ project, isLightMode }: ProjectCardProps) => {
  const cardBgClass = isLightMode
    ? "bg-white text-black shadow-lg"
    : "bg-[#191A26] text-white shadow-lg";

  const buttonClass = isLightMode
    ? "bg-yellow-300 text-black hover:bg-yellow-400"
    : "bg-yellow-300 text-black hover:bg-yellow-400";

  return (
    <Box
      margin="auto"
      borderRadius="lg"
      overflow="hidden"
      p={{ base: 4, lg: 8 }}
      boxShadow="lg"
      display="flex"
      flexDirection={{ base: "column", lg: "row-reverse" }}
      animation={`${fadeInUp} 0.6s ease-out`}
      _hover={{ boxShadow: "2xl", transform: "translateY(-5px)" }}
      transition="all 0.3s ease"
    >
      {/* Image Container */}
      <Box
        mt={{ base: 4, lg: 0 }}
        className={`${cardBgClass} rounded-md p-3 lg:w-[43%] lg:mt-[-15px] lg:shadow-none lg:ml-[-110px] lg:bg-transparent relative group`}
        animation={`${fadeInRight} 0.8s ease-out 0.2s backwards`}
      >
        {typeof project.image === "string"
          ? <Image
              src={project.image}
              alt={project.title}
              h="300px"
              w="100%"
              borderRadius="20px"
              objectFit="cover"
              transition="transform 0.5s ease, filter 0.3s ease"
              _groupHover={{
                transform: "scale(1.05) rotate(1deg)",
                filter: "brightness(1.1)"
              }}
            />
          : project.image.type === "iframe"
            ? <Box
                as="iframe"
                src={project.image.src}
                w="100%"
                h="300px"
                borderRadius="20px"
                transition="transform 0.5s ease, filter 0.3s ease"
                _groupHover={{
                  transform: "scale(1.05) rotate(1deg)",
                  filter: "brightness(1.1)"
                }}
              />
            : null}
      </Box>

      {/* Content Container */}
      <Box
        py={{ base: 6, lg: 10 }}
        px={{ base: 5, lg: 6 }}
        className={`${cardBgClass} rounded-lg mt-4 lg:w-[55%]`}
        animation={`${fadeInLeft} 0.8s ease-out 0.3s backwards`}
      >
        <Image
          w="60px"
          src={project.logo}
          alt={`${project.title} logo`}
          animation={`${float} 3s ease-in-out infinite`}
          _hover={{ animation: `${pulse} 0.5s ease-in-out` }}
        />

        <Heading
          size="md"
          mt={3}
          fontSize="2xl"
          animation={`${scaleIn} 0.6s ease-out 0.4s backwards`}
        >
          {project.title}
        </Heading>

        <Text
          fontFamily="&quot;Poppins&quot;, sans-serif"
          mt={5}
          mb={5}
          fontSize="sm"
          w={{ lg: "80%" }}
          lineHeight="1.6"
          animation={`${fadeInUp} 0.6s ease-out 0.5s backwards`}
        >
          {project.about}
        </Text>

        {/* Actions and Tech Stack */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={4}
          animation={`${fadeInUp} 0.6s ease-out 0.6s backwards`}
        >
          {/* Action Buttons */}
          <Box display="flex" alignItems="center" gap={3}>
            <Link
              href={project.liveDemo}
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <Text
                px={4}
                py={2}
                className={buttonClass}
                borderRadius="md"
                fontSize={{ base: "sm", lg: "md" }}
                fontWeight="medium"
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.1) translateY(-2px)",
                  boxShadow: "lg"
                }}
                _active={{ transform: "scale(0.95)" }}
              >
                Live Demo
              </Text>
            </Link>

            <Link
              href={project.git.url}
              isExternal
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.15) rotate(5deg)",
                color: "yellow.400"
              }}
              _active={{ transform: "scale(0.9)" }}
            >
              <IconContext.Provider value={{ size: "1.6em" }}>
                <project.git.icon />
              </IconContext.Provider>
            </Link>
          </Box>

          {/* Tech Stack Icons */}
          <Box display="flex" gap={4} alignItems="center">
            {project.languages.map((language, index) =>
              <Box
                key={index}
                position="relative"
                role="group"
                animation={`${scaleIn} 0.4s ease-out ${0.7 +
                  index * 0.1}s backwards`}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-5px) rotate(5deg)",
                  color: "yellow.400"
                }}
              >
                <IconContext.Provider value={{ size: "1.45em" }}>
                  <language.icon />
                </IconContext.Provider>

                <Text
                  position="absolute"
                  top="-10"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="gray.900"
                  color="white"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                  whiteSpace="nowrap"
                  opacity={0}
                  transition="all 0.3s ease"
                  pointerEvents="none"
                  _groupHover={{
                    opacity: 1,
                    transform: "translateX(-50%) translateY(-5px)"
                  }}
                  boxShadow="lg"
                >
                  {language.name}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;
