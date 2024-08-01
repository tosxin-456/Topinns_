import { Box, Image, Text, Link, Heading } from "@chakra-ui/react";
import { IconContext, IconType } from "react-icons";

interface GamesCardProps {
  game: {
    index: number;
    title: string;
    image: string | { type: string; src: string };
    liveDemo: string;
    git: { icon: IconType; url: string };
    languages: { icon: IconType; name: string }[];
  };
  isLightMode: boolean; // Moved isLightMode to be a direct prop
}

const GamesCard = ({ game, isLightMode }: GamesCardProps) => {
  // Function to modify the YouTube URL to autoplay and loop
  const getAutoplayLoopUrl = (url: string) => {
    const videoId = url.split("/").pop()?.split("?")[0];
    return `${url}&autoplay=1&loop=1&playlist=${videoId}`;
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      p="8"
      boxShadow="lg"
      marginBottom="20px"
      className={`${
        isLightMode ? "bg-white text-black" : "bg-[#191A26] text-white"
      }`}
    >
      <Box marginTop="20px" className="lg:flex lg:justify-between">
        {typeof game.image === "string" ? (
          <Image
            src={game.image}
            alt={game.title}
            height="300px"
            width="100%"
            borderRadius="20px"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
        ) : game.image.type === "iframe" ? (
          <Box
            as="iframe"
            src={getAutoplayLoopUrl(game.image.src)}
            width="400px"
            className="group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500"
            height="300px"
            borderRadius="20px"
            allow="autoplay"
          />
        ) : null}
      </Box>
      <Box
        paddingTop="40px"
        paddingBottom="40px"
        paddingRight="25px"
        paddingLeft="25px"
      >
        <Heading size="md" mt="3" className="text-2xl">
          {game.title}
        </Heading>
        <Box className="flex justify-between">
          <Box mt="2" className="flex">
            <Link href={game.liveDemo}>
              <Text
                padding="5px"
                margin="7px"
                className={`${
                  isLightMode
                    ? "bg-yellow-300 text-sm lg:text-md ml-[3px] text-black p-3 rounded-md lg:text-md hover:scale-110"
                    : "bg-yellow-300 p-3 hover:scale-110 rounded-md text-sm lg:text-md ml-[3px] text-black"
                }`}
              >
                Live Demo
              </Text>
            </Link>
            <Link
              margin="auto"
              className="hover:scale-110"
              href={game.git.url}
              isExternal
            >
              <IconContext.Provider value={{ size: "1.6em" }}>
                <game.git.icon />
              </IconContext.Provider>
            </Link>
          </Box>
          <Box className="flex ml-auto mt-auto mb-auto" gap="7">
            {game.languages.map((language, index) => (
              <IconContext.Provider key={index} value={{ size: "1.45em" }}>
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

export default GamesCard;
