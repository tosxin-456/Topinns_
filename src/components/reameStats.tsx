import { Text, VStack, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface FooterProps {
  event: {
    target: {
      value: string; // Assuming color value will be a string
    };
  };
}

function ReadmeStats() {
  const [color, setColor] = useState('#00fe99');
//   const { colorMode, toggleColorMode } = useColorMode();

  const handleColorChange = (event: FooterProps['event']) => {
    setColor(event.target.value); // Assuming event.target.value is a string representing color
  };

  const openStreakStats = () => {
    // Perform any action you want when clicking on GitHub Streak section
    console.log('Clicked on GitHub Streak');
  };

  const openTopLanguages = () => {
    // Perform any action you want when clicking on Top Languages section
    console.log('Clicked on Top Languages');
  };

  const openGitHubStats = () => {
    // Perform any action you want when clicking on GitHub Stats section
    console.log('Clicked on GitHub Stats');
  };

  return (
    <VStack
      className='flex flex-col lg:flex-row'
      textAlign="center"
      justifyContent="center"
      marginTop={'30px'}
      p={5}
    >
      {/* Basic color picker */}
      <Text
      className='text-3xl'
      >Development Dashboard</Text>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        style={{ marginTop: '10px' }}
        className='outline-none m-auto'
      />

      <Button mt={3}>
        Toggle Theme
      </Button>

      {/* GitHub Streak */}
      <div onClick={openStreakStats} style={{ cursor: 'pointer' }}>
        <Text mt={5}>Git Streak</Text>
        <img
          className='w-4/5 m-auto mb-5'
          src={`http://github-readme-streak-stats.herokuapp.com?user=tosxin-456&theme=tokyonight&ring=${color.replace(
            '#',
            ''
          )}&fire=${color.replace('#', '')}&currStreakLabel=${color.replace('#', '')}`}
          alt="GitHub Streak"
        />
      </div>

      {/* Top Languages */}
      <div onClick={openTopLanguages} style={{ cursor: 'pointer' }}>
        <Text>Git Used Languages</Text>
        <img
          className='mb-5'
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=tosxin-456&layout=compact&theme=tokyonight&title_color=${color.replace(
            '#',
            ''
          )}&text_color=${color.replace('#', '')}`}
          alt="Top Languages"
        />
      </div>

      {/* GitHub Stats */}
      <div onClick={openGitHubStats} style={{ cursor: 'pointer' }}>
        <Text>My GitHub Stats</Text>
        <picture>
          <source
            srcSet={`https://github-readme-stats.vercel.app/api?username=tosxin-456&show_icons=true&theme=tokyonight&title_color=${color.replace(
              '#',
              ''
            )}&text_color=${color.replace('#', '')}`}
            media="(prefers-color-scheme: dark)"
          />
          <source
            srcSet={`https://github-readme-stats.vercel.app/api?username=tosxin-456&show_icons=true&title_color=${color.replace(
              '#',
              ''
            )}&text_color=${color.replace('#', '')}`}
            media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
          />
          <Text></Text>
          <img
            src={`https://github-readme-stats.vercel.app/api?username=tosxin-456&show_icons=true&title_color=${color.replace(
              '#',
              ''
            )}&text_color=${color.replace('#', '')}`}
            alt="GitHub Stats"
          />
        </picture>
      </div>
    </VStack>
  );
}

export default ReadmeStats;
