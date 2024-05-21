// import React from 'react'
import { Text, VStack,} from '@chakra-ui/react';
// import { useEffect, useRef } from 'react';
// import Typed from 'typed.js'

function Topskills() {
    // const el = useRef<HTMLDivElement | null>(null);
  
    // useEffect(() => {
    //   if (el.current) {
    //     const typed = new Typed(el.current, {
    //       strings: ['Events', 'Locations', 'Business'],
    //       typeSpeed: 100,
    //       backSpeed: 50,
    //       backDelay: 3000,
    //       loop: true, // This should be a boolean
    //     });
  
    //     // Cleanup to destroy the Typed instance when the component unmounts
    //     return () => {
    //       typed.destroy();
    //     };
    //   }
    // }, []);
  



  return (
    <VStack
    mt={'35px'}
    >
      <Text
      className='text-3xl'
      >My Top Skills</Text>
      <Text 
      textAlign={'center'}
      padding={'7px'}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quibusdam ratione officia eius exercitationem molestiae. Similique ipsa fugit nisi ipsam enim, iste ea neque laboriosam! Qui pariatur aut laboriosam, odio dolores iste a harum maxime architecto ut voluptatem suscipit excepturi tempore quod accusamus odit soluta vitae! Temporibus obcaecati hic ab.
      </Text>
      {/* <Text as="div" display="inline-block">
        <span ref={el}></span>
      </Text> */}
          

    </VStack>
  )
}

export default Topskills
