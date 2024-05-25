import diamond from '../assets/project images/diamonddreams.png';
import bethel from '../assets/project images/Bethelteens.png';
import senex from '../assets/project images/senexCare.png';
import senexLogo from '../assets/project images/senexLogo.png';
import betheLogo from '../assets/project images/bethelLogo.png';
import medlink from '../assets/project images/medlink.png';
import learnhub from '../assets/project images/learnHub.png';
import medlinkLogo from '../assets/project images/medlinkLogo.svg';
import topLogo from '../assets/project images/Earth_Globe_Planet_-_Free_photo_on_Pixabay-removebg-preview.png';
import learnHUbLogo from '../assets/project images/LEARN-HUB.svg';


import { FaGithub  } from "react-icons/fa";
import { SiPrivateinternetaccess } from "react-icons/si";
import { IconType } from 'react-icons';
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
// import { SiTailwindcss } from "react-icons/si";
// import { SiChakraui } from "react-icons/si";
// import { FaPython } from "react-icons/fa";
// import { SiJupyter } from "react-icons/si";

// Define the structure of the Projects interface
interface Projects {
    index: number;
    title: string;
    image: string | { type: string; src: string };
    about: string;
    caseStudy: string;
    liveDemo: string;
    logo: string;
    git: { icon: IconType; url: string };
    languages: { icon: IconType; name: string }[];
}

// Define the projects array with the correct structure
export const projects: Projects[] = [
  {
    index: 1,
    title: 'Bethel Teens Club',
    about: `
    Bethel Teens Club: A vibrant online community for Christian teenagers. I developed a welcoming website for this dynamic club, providing a safe space for members to connect, grow, and inspire each other. With a user-friendly interface and engaging features, this site fosters a sense of belonging and spiritual growth among its young users. The website's features include a images from our gallery, a brief write up about each teen, and a few quotes to sinpire any visitor, all carefully crafted to support the club's mission and promote a sense of community and connection among its members. By creating this online hub, I aimed to empower the next generation of leaders to deepen their faith, build meaningful relationships, and shine their light for Christ.
    `,
    logo:betheLogo,
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
    title: 'Diamond Dreams Events and Center',
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
      { icon: FaNode, name: 'Node.js' },
    { icon: SiExpress, name: 'Express.js' }

    ]
  },
  {
    index: 3,
    title: 'senexCare',
    about:`
    As Team Lead, I spearheaded senexCare, an innovative app designed to enhance medication adherence for seniors. I oversaw backend development, collaborated with the UI/UX team, and integrated AI-powered reminders (like Gemini) for personalization. The user-friendly interface, designed on Figma, ensures a smooth experience.  senexCare features emergency alerts, notifying designated contacts of missed medication or unusual activity.  Integration with Google Maps allows for quick location of nearby hospitals in case of emergencies.  Our hard work culminated in successfully submitting senexCare to Google and receiving a Certificate of Participation. I'm proud to have led the creation of this impactful solution that empowers seniors and their caregivers with a more accessible, efficient, and safe medication management system.
      `,
    logo:senexLogo,  
    caseStudy: 'hello world to all the planets',
    image: senex,
    git: { icon: FaGithub, url: 'https://github.com/GDSC-Unijos/Health-App-Frontend' },  // 
    liveDemo: 'https://senex-care.vercel.app/',
    languages: [  // Define languages with icons and names
    { icon: SiExpress, name: 'Express.js' },
    { icon: SiTypescript, name: 'Typscript' },
    { icon: FaReact, name: 'React' },
    { icon: SiMongodb, name: 'MongoDb' },
    { icon: FaNode, name: 'Node.js' },
    { icon: FaFigma, name: 'Figma' }

    ]
  },
  {
    index: 4,
    title: 'Medlink',
    about:`
    MedLink, a healthcare app I spearheaded as Team Lead, revolutionizes appointment booking, medication refills, and record management. This user-centric platform offers secure cloud storage for medical records. Our innovative solution, built with a robust backend infrastructure, empowers patients and simplifies healthcare.  Winning first place at nHub Foundation's Pitch Friday validates MedLink's potential to improve healthcare management for everyone.
      `,
    logo:medlinkLogo,  
    caseStudy: 'hello world to all the planets',
    image: medlink,
    git: { icon: SiPrivateinternetaccess, url: '#' },  // 
    liveDemo: 'https://medlink-v1.netlify.app/',
    languages: [  // Define languages with icons and names
    { icon: SiExpress, name: 'Express.js' },
    { icon: IoLogoJavascript, name: 'Javascript' },
    { icon: SiMongodb, name: 'MongoDb' },
    { icon: FaNode, name: 'Node.js' },

    ]
  },
  {
    index: 5,
    title: 'Learn Hub',
    about:`
    LearnHub is a comprehensive educational website offering courses and resources in frontend, backend, data science, machine learning, and more. The platform provides a user-friendly interface and robust infrastructure, supporting a supportive community of learners.

    Developed by a dedicated team, led by me as Project Manager and Team Lead, LearnHub secured first position in a prestigious pitch friday competition, demonstrating the team's commitment to high-quality educational resources. The platform empowers individuals to excel in coding, fostering a community that learns, grows, and succeeds together.
    
    LearnHub continues to inspire and educate, shaping the next generation of coding professionals.
      `,
    logo:learnHUbLogo,  
    caseStudy: 'hello world to all the planets',
    image: learnhub,
    git: { icon: FaGithub, url: 'https://github.com/tosxin-456/Learn-Hub_E-Learning' },  // 
    liveDemo: 'https://genuine-longma-828e44.netlify.app/',
    languages: [  // Define languages with icons and names
    { icon: FaHtml5, name: 'Html' },
    { icon: FaCss3Alt, name: 'Css' },
    { icon: IoLogoJavascript, name: 'Javascript' },
    { icon: SiExpress, name: 'Express.js' },
    { icon: SiMongodb, name: 'MongoDb' },
    { icon: FaNode, name: 'Node.js' },

    ]
  },
  {
    index: 5,
    title: `Top's Planets`,
    about:`
    Top's Planets takes you on a 3D voyage through our solar system, crafted with React and Three.js. This interactive web app lets you explore planets, moons, and celestial wonders in a visually captivating environment. I utilized React to manage the interface and user interactions, while Three.js powered the stunning 3D graphics and animations.  This project highlights my expertise in building interactive React applications, creating immersive 3D visualizations, and translating scientific data into an engaging and educational experience.
    `,
    logo: topLogo,
    caseStudy: 'hello world to all the planets',
    image: {
      type: 'iframe',
      src: 'https://www.youtube.com/embed/qp0AZmb1vDA?si=7b1b1vLxT9rO_KMz'
    },
    git: { icon: FaGithub, url: 'https://github.com/tosxin-456/top-s-planet' },  // 
    liveDemo: 'https://top-planet.vercel.app/',
    languages: [
      { icon: IoLogoJavascript, name: 'Javascript' },
      { icon: TbBrandThreejs, name: 'Three.js' },
      { icon: FaReact, name: 'React' },
    ]
  }
  
];


