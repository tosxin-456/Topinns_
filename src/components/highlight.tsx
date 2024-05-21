import  { useEffect, useRef, } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Typed from 'typed.js';
// import { NavLink } from 'react-router-dom';

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
          <b>love();</b>`,
          `HTML:
           <br>
          <h1 class="quote">"The beauty of life is in its moments."</h1>
          CSS:
          <br>
          .quote {
            <br>
            position: relative;
            <br>
          }
          <br>
          .quote::before {
            <br>
            content: "truthfully";
            <br>
            position: absolute;
            <br>
            top: 0;
            <br>
            left: 0;
            <br>
            width: 0;
            <br>
            height: 100%;
            <br>
            background: linear-gradient(to right, #ff9999, #66cc00);
            <br>
            animation: animate 5s linear infinite;
            <br>
          }
          <br>          
          @keyframes animate {
            <br>
            0% {
              <br> 
              width: 0;
              <br>
            }
            <br>
            100% {
              <br>
              width: 100%;
              <br>
            }  }`,
            `interface Life {
              <br>
              owner: string;
              <br>
            }
            <br>
            let myLife: Life = { owner: 'Self' };
            <br>
            function giveLifeToJesus.life(owner: string) {
              <br>
              myLife.owner = 'Jesus';
              <br>
            }
            <br>
            giveLifeToJesus(myLife);
            <br>
            console.log(myLife); // Output: { owner: 'Jesus' }`,
            `import numpy as np
            <br>
            from sklearn.feature_extraction.text import TfidfVectorizer
            <br>
            from sklearn.metrics.pairwise import cosine_similarity
            <br>
            you = "you"
            <br>
            love = "love"
            <br>
            i = "I"
            <br>
            sentences = [f"{i} {love} {you}"]
            <br>
            vectorizer = TfidfVectorizer()
            <br>
            vectors = vectorizer.fit_transform(sentences)
            <br>
            similarity = cosine_similarity(vectors)
            <br>
            print(f"The similarity between '{i}' loving '{you}' is {similarity[0][0]}")
            <br>
            # Translate "I love you" to Klingon
            <br>
            klingon_translation = "qamuSHa'"
            <br>
            print(klingon_translation + "mal'a" )
            `
        ],
        typeSpeed: 35,
        backSpeed: 35,
        backDelay: 300,
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
