import { Box, Text, Button } from "@chakra-ui/react";
import { games } from "../utils/games";
import GamesCard from "./gamesCard";
import { useState } from "react";

interface GamesListProps {
  isLightMode: boolean;
}

const GamesList = ({ isLightMode }: GamesListProps) => {
  const [visibleGames, setVisibleGames] = useState(8);

  const handleSeeMore = () => {
    setVisibleGames(games.length);
  };

  const background = isLightMode
    ? "rgba(0, 0, 0, 0.01)"
    : "rgba(0, 0, 0, 0.01)";

  return (
    <Box position="relative">
      <Text className="text-3xl" textAlign="center" m="50px">
        Games
      </Text>
      <Box
        display="flex"
        flexWrap="wrap"
        mt="15px"
        gap="5"
        margin="auto"
        boxShadow="lg"
        className="w-[95%] lg:w-[80%]"
      >
        {games.slice(0, visibleGames).map((game, index) => (
          <GamesCard
            key={index}
            game={{ ...game, index }}
            isLightMode={isLightMode}
          />
        ))}
      </Box>
      {visibleGames < games.length && (
        <Box
          position="relative"
          mt="-65px" // Adjust as needed to create overlap
          mb="60px" // To give some space after the button
          width="100%"
          textAlign="center"
          background={background} // Conditional background
          backdropFilter="blur(10px)"
          zIndex="1"
          padding={"40px"}
        >
          <Button
            onClick={handleSeeMore}
            className="hover:underline text-[#6A98F0]"
          >
            See More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GamesList;
