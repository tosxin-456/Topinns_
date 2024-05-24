import diamond from '../assets/project images/diamonddreams.png';
import bethel from '../assets/project images/Bethelteens.png';
import senex from '../assets/project images/senexCare.png';
import senexLogo from '../assets/project images/senexLogo.png';

import { FaGithub  } from "react-icons/fa";
import { IconType } from 'react-icons';
import { FaCss3Alt } from "react-icons/fa";
// import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
// import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
// import { SiChakraui } from "react-icons/si";
// import { FaPython } from "react-icons/fa";
// import { SiJupyter } from "react-icons/si";

// Define the structure of the Projects interface
interface Projects {
  title: string;
  image: string;
  about: string;
  caseStudy: string;
  liveDemo: string;
  logo:string;
  git: { icon: IconType; url: string };  // Define git as an object with icon and url
  languages: { icon: IconType; name: string }[];  // Define languages as an array of objects with icon and name
  index: number;
}

// Define the projects array with the correct structure
export const projects: Projects[] = [
  {
    index: 1,
    title: 'Bethel Teens Club',
    about: `
    Bethel Teens Club: A vibrant online community for Christian teenagers. I designed and developed a welcoming website for this dynamic club, providing a safe space for members to connect, grow, and inspire each other. With a user-friendly interface and engaging features, this site fosters a sense of belonging and spiritual growth among its young users. The website's features include a discussion forum, event calendar, and resource library, all carefully crafted to support the club's mission and promote a sense of community and connection among its members. By creating this online hub, I aimed to empower the next generation of leaders to deepen their faith, build meaningful relationships, and shine their light for Christ.
    `,
    logo:'https://bethel-teens-club.netlify.app/assets/Screenshot%20(90)-add84d63.png',
    caseStudy: 'hello world to all the planets',
    image: bethel,
    git: { icon: FaGithub, url: 'https://github.com/tosxin-456/Bethel-Teens' },  // Assign the URL to the git property
    liveDemo: 'https://bethel-teens-club.netlify.app/',
    languages: [  // Define languages with icons and names
    { icon: FaHtml5, name: 'Html' },
    { icon: FaCss3Alt, name: 'Css' },
      { icon: FaReact, name: 'React' }
    //   { icon: IoLogoJavascript, name: 'GitHub' }

    ]
  },
  {
    index: 2,
    title: 'Diamond Dreams Evenst and Center',
    about:`
    I worked on Diamond Dreams, a dynamic website featuring e-commerce, blogging, and academy registration. I collaborated with a team member on API consumption and solo-handled backend development and integration. The project showcases my full-stack skills, including API integration for efficient data management and a fully functional admin dashboard for effortless content management, all while providing a seamless user experience across various sections. A rewarding project that demonstrates my ability to build comprehensive and user-friendly websites
      `,
    logo:'https://diamond-dreams-umber.vercel.app/assets/dark-logo-DhiC-5eV.svg',
    caseStudy: 'hello world to all the planets',
    image: diamond,
    git: { icon: FaGithub, url: 'https://github.com/tosxin-456/diamond-dreams' },  // 
    liveDemo: 'https://diamond-dreams-umber.vercel.app',
    languages: [  // Define languages with icons and names
    { icon: FaHtml5, name: 'Html' },
    { icon: FaReact, name: 'React' },
    { icon: SiMongodb, name: 'MongoDb' },
      { icon: FaNode, name: 'Node.js' }

    ]
  },
  {
    index: 2,
    title: 'senexCare',
    about:`
    As Team Lead, I guided the development of SenexCare, an innovative app for seniors to track medication intake and monitor progress through interactive graphs. I collaborated on backend development, worked with the frontend team, and integrated APIs, including Gemini AI for personalized reminders. I designed the UI on Figma, ensuring a seamless user experience.
    We successfully submitted SenexCare to Google and received a Certificate of Participation, a testament to our hard work and dedication. I'm proud to have led a team that created a meaningful solution for seniors and caregivers, making medication management more accessible and efficient.
      `,
    logo:senexLogo,  
    caseStudy: 'hello world to all the planets',
    image: senex,
    git: { icon: FaGithub, url: 'https://github.com/GDSC-Unijos/Health-App-Frontend' },  // 
    liveDemo: 'https://senex-care.vercel.app/',
    languages: [  // Define languages with icons and names
    { icon: SiTypescript, name: 'Typscript' },
    { icon: FaReact, name: 'React' },
    { icon: SiMongodb, name: 'MongoDb' },
    { icon: FaNode, name: 'Node.js' },
    { icon: FaFigma, name: 'Figma' }

    ]
  },
];


