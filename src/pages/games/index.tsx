// import React from 'react'
import { Box } from "@chakra-ui/react";
import GamesList from "../../components/games";

interface GamesProps {
  isLightMode: boolean;
}

function Games({ isLightMode }: GamesProps) {
  return (
    <Box fontFamily="'Clash Display', sans-serif">
      <GamesList isLightMode={isLightMode} />
    </Box>
  );
}

export default Games;
