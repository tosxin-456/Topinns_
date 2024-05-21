import  { useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Typed from 'typed.js';

interface FooterProps {
  isLightMode: boolean;
}

function Highlight({ isLightMode }: FooterProps) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: [
          `function <b>love</b>()  {
            <br>
          <b>life.</b>happiness += 10;
          <br>
          console.log("Love is in the air! Happiness level: " + life.happiness);
           <br>
          }
          <br>
          function lifeEvents(event) {
            <br>
          if (event === "love") {
          <br>
          love();
          <br>
          } else {
            <br>
          console.log("Life is okay, but happiness level remains: " + life.happiness);
          <br>
          }
          <br>
          }
          <br>
          <b>love();</b>`
        ],
        typeSpeed: 35,
        backSpeed: 500,
        backDelay: 30,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <Box
      className={`${isLightMode ? 'bg-[white] text-[#3b5994] shadow-lg' : 'bg-[#141613]'} m-auto mt-[20px] text-[15px] lg:ml-auto lg:mt-[150px] lg:mr-[10%] p-[15px] w-[80%] lg:w-[400px] rounded-[7px] text-start`}
      height={'fit-content'}
      color={'#6A98F0'}
    >
      <Text as="div" display="inline-block" className={`${isLightMode ? 'text-[#3b5994]' : 'text-[#6A98F0]'}`}>
        <span ref={el}></span>
      </Text>
    </Box>
  );
}

export default Highlight;
