import diamond from "../assets/project images/diamonddreams.png";
import bethel from "../assets/project images/Bethelteens.png";
import senex from "../assets/project images/senexCare.png";
import senexLogo from "../assets/project images/senexLogo.png";
import betheLogo from "../assets/project images/bethelLogo.png";
import medlink from "../assets/project images/medlink.png";
import learnhub from "../assets/project images/learnHub.png";
import medlinkLogo from "../assets/project images/medlinkLogo.svg";
import topLogo from "../assets/project images/Earth_Globe_Planet_-_Free_photo_on_Pixabay-removebg-preview.png";
import learnHUbLogo from "../assets/project images/LEARN-HUB.svg";
import amica from "../assets/project images/amica.png";
import hateSpeech from "../assets/project images/hatespeech1.png";
import toppins_chat from "../assets/project images/Screenshot (96)(2).png";
import teechaa from "../assets/project images/teechaa.png";
import switch_health from "../assets/project images/WhatsApp Image 2024-12-27 at 17.17.06_400323c8.jpg";
import craddule from "../assets/project images/Screenshot (100).png";
import flow from "../assets/project images/Screenshot (98).png";
import glynn from "../assets/project images/Screenshot (99).png";
import blssd from "../assets/project images/blssd.png";
import quizCreation from "../assets/project images/quiz-creation.png";
import quiz from "../assets/project images/quiz-playing.png";
import archbirdg from "../assets/project images/archbridgecare.png";
import aeroplane from "../assets/project images/aeroplane.png";
import malak from "../assets/project images/malak.png";
import oasisplus from "../assets/project images/oasisplus.png";
// import malak from "../assets/project images/Screenshot (99).png";

import { FaGithub } from "react-icons/fa";
import { SiPrivateinternetaccess } from "react-icons/si";
import { IconType } from "react-icons";
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
import { FaPython } from "react-icons/fa";
import { SiJupyter } from "react-icons/si";

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
    title: "Bethel Teens Club",
    about: `
    Bethel Teens Club: A vibrant online community for Christian teenagers. I developed a welcoming website for this dynamic club, providing a safe space for members to connect, grow, and inspire each other. With a user-friendly interface and engaging features, this site fosters a sense of belonging and spiritual growth among its young users. The website's features include a images from our gallery, a brief write up about each teen, and a few quotes to sinpire any visitor, all carefully crafted to support the club's mission and promote a sense of community and connection among its members. By creating this online hub, I aimed to empower the next generation of leaders to deepen their faith, build meaningful relationships, and shine their light for Christ.
    `,
    logo: betheLogo,
    caseStudy: "hello world to all the planets",
    image: bethel,
    git: { icon: FaGithub, url: "https://github.com/tosxin-456/Bethel-Teens" }, // Assign the URL to the git property
    liveDemo: "https://bethel-teens-club.netlify.app/",
    languages: [
      // Define languages with icons and names
      { icon: FaHtml5, name: "Html" },
      { icon: FaCss3Alt, name: "Css" },
      { icon: FaReact, name: "React" }
      //   { icon: IoLogoJavascript, name: 'GitHub' }
    ]
  },
  {
    index: 2,
    title: "Diamond Dreams Events and Center",
    about: `
    I worked on Diamond Dreams, a dynamic website featuring e-commerce, blogging, and academy registration. I collaborated with a team member on API consumption and solo-handled backend development and integration. The project showcases my full-stack skills, including API integration for efficient data management and a fully functional admin dashboard for effortless content management, all while providing a seamless user experience across various sections. A rewarding project that demonstrates my ability to build comprehensive and user-friendly websites
      `,
    logo: "https://diamond-dreams-umber.vercel.app/assets/dark-logo-DhiC-5eV.svg",
    caseStudy: "hello world to all the planets",
    image: diamond,
    git: {
      icon: FaGithub,
      url: "https://github.com/tosxin-456/diamond-dreams"
    }, //
    liveDemo: "https://diamond-dreams-umber.vercel.app",
    languages: [
      // Define languages with icons and names
      { icon: FaHtml5, name: "Html" },
      { icon: FaReact, name: "React" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" },
      { icon: SiExpress, name: "Express.js" }
    ]
  },
  {
    index: 3,
    title: "senexCare",
    about: `
    As Team Lead, I spearheaded senexCare, an innovative app designed to enhance medication adherence for seniors. I oversaw backend development, collaborated with the UI/UX team, and integrated AI-powered reminders (like Gemini) for personalization. The user-friendly interface, designed on Figma, ensures a smooth experience.  senexCare features emergency alerts, notifying designated contacts of missed medication or unusual activity.  Integration with Google Maps allows for quick location of nearby hospitals in case of emergencies.  Our hard work culminated in successfully submitting senexCare to Google and receiving a Certificate of Participation. I'm proud to have led the creation of this impactful solution that empowers seniors and their caregivers with a more accessible, efficient, and safe medication management system.
      `,
    logo: senexLogo,
    caseStudy: "hello world to all the planets",
    image: senex,
    git: {
      icon: FaGithub,
      url: "https://github.com/GDSC-Unijos/Health-App-Frontend"
    }, //
    liveDemo: "https://senex-care.vercel.app/",
    languages: [
      // Define languages with icons and names
      { icon: SiExpress, name: "Express.js" },
      { icon: SiTypescript, name: "Typscript" },
      { icon: FaReact, name: "React" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" },
      { icon: FaFigma, name: "Figma" }
    ]
  },
  {
    index: 4,
    title: "Medlink",
    about: `
    MedLink, a healthcare app I spearheaded as Team Lead, revolutionizes appointment booking, medication refills, and record management. This user-centric platform offers secure cloud storage for medical records. Our innovative solution, built with a robust backend infrastructure, empowers patients and simplifies healthcare.  Winning first place at nHub Foundation's Pitch Friday validates MedLink's potential to improve healthcare management for everyone.
      `,
    logo: medlinkLogo,
    caseStudy: "hello world to all the planets",
    image: medlink,
    git: { icon: SiPrivateinternetaccess, url: "#" }, //
    liveDemo: "https://medlink-v1.netlify.app/",
    languages: [
      // Define languages with icons and names
      { icon: SiExpress, name: "Express.js" },
      { icon: IoLogoJavascript, name: "Javascript" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 5,
    title: "Learn Hub",
    about: `
    LearnHub is a comprehensive educational website offering courses and resources in frontend, backend, data science, machine learning, and more. The platform provides a user-friendly interface and robust infrastructure, supporting a supportive community of learners.

    Developed by a dedicated team, led by me as Project Manager and Team Lead, LearnHub secured first position in a prestigious pitch friday competition, demonstrating the team's commitment to high-quality educational resources. The platform empowers individuals to excel in coding, fostering a community that learns, grows, and succeeds together.
    
    LearnHub continues to inspire and educate, shaping the next generation of coding professionals.
      `,
    logo: learnHUbLogo,
    caseStudy: "hello world to all the planets",
    image: learnhub,
    git: {
      icon: FaGithub,
      url: "https://github.com/tosxin-456/Learn-Hub_E-Learning"
    }, //
    liveDemo: "https://genuine-longma-828e44.netlify.app/",
    languages: [
      // Define languages with icons and names
      { icon: FaHtml5, name: "Html" },
      { icon: FaCss3Alt, name: "Css" },
      { icon: IoLogoJavascript, name: "Javascript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 6,
    title: `Top's Planets`,
    about: `
    Top's Planets takes you on a 3D voyage through our solar system, crafted with React and Three.js. This interactive web app lets you explore planets, moons, and celestial wonders in a visually captivating environment. I utilized React to manage the interface and user interactions, while Three.js powered the stunning 3D graphics and animations.  This project highlights my expertise in building interactive React applications, creating immersive 3D visualizations, and translating scientific data into an engaging and educational experience.
    `,
    logo: topLogo,
    caseStudy: "hello world to all the planets",
    image: {
      type: "iframe",
      src: "https://www.youtube.com/embed/qp0AZmb1vDA?si=7b1b1vLxT9rO_KMz"
    },
    git: { icon: FaGithub, url: "https://github.com/tosxin-456/top-s-planet" }, //
    liveDemo: "https://top-planet.vercel.app/",
    languages: [
      { icon: IoLogoJavascript, name: "Javascript" },
      { icon: TbBrandThreejs, name: "Three.js" },
      { icon: FaReact, name: "React" }
    ]
  },
  {
    index: 7,
    title: "Amica",
    about: `
    As Team Lead and Backend Developer, I led the development of Amica, a web application for tracking financial transactions and collaborating with others. Amica features a user-friendly interface, joint account management, and real-time updates, all built on a secure and scalable backend infrastructure. I oversaw the project from start to finish, ensuring a smooth development process and effective teamwork. Amica showcases my expertise in leading teams, designing scalable architectures, and developing user-centric applications, and I'm proud to feature it in my portfolio.
      `,
    logo: "https://amica01.netlify.app/images/logo.svg",
    caseStudy: "hello world to all the planets",
    image: amica,
    git: { icon: FaGithub, url: "https://github.com/tosxin-456/Amica" }, //
    liveDemo: "https://amica01.netlify.app/signin.html",
    languages: [
      // Define languages with icons and names
      { icon: FaHtml5, name: "Html" },
      { icon: FaCss3Alt, name: "Css" },
      { icon: IoLogoJavascript, name: "Javascript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 8,
    title: "Hate Speech Detector",
    about: `
  
     As a developer, I'm currently working on a Python project that utilizes machine learning to detect hate speech in text data. Using Jupyter Notebook, I've made significant progress in developing a model that can identify hateful language with promising accuracy. Although the project is still in progress, I'm excited about the potential impact it could have in promoting online safety and inclusivity. So far, I've implemented natural language processing techniques and trained the model on a dataset of labeled text examples. While there's still more work to be done to refine the model's performance and address edge cases, I'm proud of the progress I've made and look forward to continuing to develop this important project.
      `,
    logo: " ",
    caseStudy: "hello world to all the planets",
    image: hateSpeech,
    git: { icon: FaGithub, url: "https://github.com/tosxin-456/hate_speech" }, //
    liveDemo: "https://github.com/tosxin-456/hate_speech",
    languages: [
      // Define languages with icons and names
      { icon: FaPython, name: "Python" },
      { icon: SiJupyter, name: "Jupyter" }
    ]
  },
  {
    index: 9,
    title: "Toppins Chat Genie",
    about: `
     As a developer, I created Toppins Chat Genie, an AI-powered bot designed to enhance conversational experiences. Utilizing natural language processing and machine learning, it can understand context, recognize emotions, and provide insightful, human-like responses.
     The bot is capable of handling a range of tasks, from answering questions and offering recommendations to assisting with everyday activities. Built with Python and trained on extensive datasets, it’s continually learning and improving to meet user needs effectively.
     Though still evolving, Toppins Chat Genie reflects my passion for creating intelligent systems that make communication more engaging and efficient. I'm proud of the progress so far and excited about its potential to redefine digital interactions.
`,
    logo: " ",
    caseStudy: "hello world to all the planets",
    image: toppins_chat,
    git: {
      icon: FaGithub,
      url: "https://github.com/tosxin-456/TopinsChatGenie"
    }, //
    liveDemo: "https://topins-chat-genie.vercel.app",
    languages: [
      { icon: SiExpress, name: "Express.js" },
      { icon: IoLogoJavascript, name: "Javascript" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 10,
    title: "Teechaa",
    about: `
As a developer, I created Teechaa, a teaching app designed to help students improve their learning and excel in their exams. The app offers a variety of features, including interactive lessons, practice quizzes, and detailed progress tracking, all tailored to support students in mastering their subjects.

Teechaa is built with the goal of making education accessible and effective, focusing on simplifying complex topics and providing students with the tools they need to succeed. Whether it’s preparing for exams or building foundational knowledge, the app is designed to guide students every step of the way.

Teechaa reflects my commitment to creating practical solutions for education, and I’m proud of its potential to make a meaningful difference in the lives of students everywhere.
`,
    logo: " ",
    caseStudy: "hello world to all the planets",
    image: teechaa,
    git: { icon: SiPrivateinternetaccess, url: "#" }, //
    liveDemo: "https://teechaa.vercel.app",
    languages: [
      { icon: SiExpress, name: "Express.js" },
      { icon: IoLogoJavascript, name: "Javascript" },
      { icon: SiMongodb, name: "MongoDb" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 11,
    title: "Switch Health",
    about: `
Switch Health is a mobile app that I developed with a friend to improve healthcare accessibility and efficiency. Built with React Native, the app allows users to book appointments, access medical records, and consult with healthcare professionals seamlessly. 

In this collaboration, I focused on building the backend and integrating APIs to ensure secure data management and smooth communication between the app and the server. My friend handled the frontend design and user interface, creating an intuitive experience for users. Together, we created a platform that bridges the gap between patients and providers while prioritizing security and usability.

Switch Health showcases our combined skills and shared commitment to leveraging technology to make healthcare services more accessible and convenient.
`,
    logo: " ",
    caseStudy:
      "Switch Health connects patients and providers with streamlined appointment booking and medical record management.",
    image: switch_health,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://switchhealth.example.com",
    languages: [
      { icon: FaReact, name: "React Native" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 12,
    title: "Craddule",
    about: `
Craddule is a platform designed to assist individuals and teams in building their projects and startups from the ground up. During my internship, I contributed to both the frontend and backend development, gaining hands-on experience in creating a seamless user experience and building robust server-side logic.

The platform offers tools and resources to help users organize, plan, and execute their ideas effectively. Whether it’s managing workflows, collaborating with team members, or accessing expert guidance, Craddule is tailored to support innovation and growth.

Working on Craddule gave me the opportunity to develop my skills further and be part of a project aimed at empowering people to bring their visions to life.
`,
    logo: " ",
    caseStudy:
      "Craddule empowers innovators with tools and resources to turn ideas into reality.",
    image: craddule,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "#",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 13,
    title: "Flow",
    about: `
Flow is a platform that streamlines processes and enhances team productivity through intuitive workflows and collaboration tools. During my three-month internship, I contributed to both the frontend and backend development, diving deep into creating user-friendly interfaces and implementing efficient server-side solutions.

The experience was intense, I almost died, it was a rewarding journey that pushed me to grow both as a developer and as a problem-solver. From handling complex integrations to ensuring a seamless user experience, working on Flow was a challenge I’m proud to have tackled.

Flow represents my dedication to building tools that simplify work and foster better teamwork.
`,
    logo: " ",
    caseStudy:
      "Streamlining workflows and enhancing team collaboration with Flow.",
    image: flow,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "#",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 14,
    title: "Glynn",
    about: `
Glynn is an online shopping platform built with the goal of offering users an easy and seamless shopping experience. As part of the development, I worked on building both the frontend and backend using TypeScript (TSX), focusing on enhancing the user interface and ensuring the application’s performance and security.

Glynn provides a wide range of products, with smooth navigation, a secure checkout process, and personalized recommendations. My involvement included integrating payment gateways, implementing dynamic product pages, and ensuring a responsive design for various devices.

The project is a testament to my ability to combine modern technologies like TypeScript and React to create a robust and scalable e-commerce platform.
`,
    logo: " ",
    caseStudy:
      "Empowering shopping experiences with Glynn's seamless online platform.",
    image: glynn,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://glynnsworld.netlify.app/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 15,
    title: "Toppins Quiz Creator",
    about: `
Toppins Quiz Creator is a platform I built to let users create their own quizzes easily — similar to Kahoot but without restrictive user limits. It supports customizable quiz formats, live multiplayer creation mode (in progress), and real-time updates for collaborative quiz building. The focus is on freedom and scalability for educators, trainers, and fun group games.`,
    logo: " ",
    caseStudy: "Build and host your own quizzes seamlessly.",
    image: quizCreation,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://toppins-games-create.vercel.app/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 16,
    title: "Toppins Quiz Play",
    about: `
Toppins Quiz Play complements the Quiz Creator — a fun, interactive platform where users can join and play quizzes created by others. Designed for speed, responsiveness, and real-time interaction, it’s the play-side experience of the Toppins game ecosystem.`,
    logo: " ",
    caseStudy: "Interactive multiplayer quiz platform built for engagement.",
    image: quiz,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://toppins-games.vercel.app/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 17,
    title: "BLSSD",
    about: `
BLSSD is a modern, visually captivating website created for a music company. It showcases artists, music collections, and events, with a clean UI and a fast, responsive layout. The project reflects my ability to build creative, entertainment-focused web experiences.`,
    logo: " ",
    caseStudy: "Modern web experience for a music label.",
    image: blssd,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://blssd.vercel.app/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 18,
    title: "Malak Health",
    about: `
Malak is a health startup website built to promote accessibility and awareness in healthcare. The site features service descriptions, health resources, and startup information with a soothing and professional interface.`,
    logo: " ",
    caseStudy: "Building trust and innovation through health technology.",
    image: malak,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://www.malak.name.ng/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 19,
    title: "ArchBridge Care Foundation",
    about: `
ArchBridge Care Foundation’s website highlights the work and outreach programs of the foundation. It includes donation sections, event updates, and volunteer registration — built to empower and inform visitors about the foundation’s impact.`,
    logo: " ",
    caseStudy: "Digital presence for a foundation making a difference.",
    image: archbirdg,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://archbridgecarefoundation.com/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 20,
    title: "OasisPlus",
    about: `
OasisPlus is a media platform designed for watching and streaming content online. With a fluid, Netflix-style interface, it provides users with a premium viewing experience while offering content creators a platform to reach audiences.`,
    logo: " ",
    caseStudy: "Building an immersive online streaming experience.",
    image: oasisplus,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://www.oasisplus.com.ng/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 21,
    title: "Aeroplane",
    about: `
Aeroplane is a flight booking platform that lets users search, book, and manage flight reservations seamlessly. The UI is designed for clarity and simplicity, with fast search integration and responsive layouts.`,
    logo: " ",
    caseStudy:
      "Simplifying travel planning with Aeroplane’s flight booking system.",
    image: aeroplane,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://aeroplane-website-pi.vercel.app/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
  {
    index: 22,
    title: "Toppins Chat Genie",
    about: `
Toppins Chat Genie is my personal ChatGPT-like project — a conversational AI assistant that provides intelligent and context-aware responses. Built to showcase NLP integration and custom AI model handling, it merges conversational design with scalable backend support.`,
    logo: " ",
    caseStudy: "Creating intelligent digital interactions through AI chat.",
    image: toppins_chat,
    git: { icon: SiPrivateinternetaccess, url: "#" },
    liveDemo: "https://topins-chat-genie.vercel.app/",
    languages: [
      { icon: FaReact, name: "React" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: FaNode, name: "Node.js" }
    ]
  },
//   {
//     index: 23,
//     title: "Teechaa",
//     about: `
// Teechaa is an educational platform designed to help students learn and prepare effectively for exams. It provides interactive lessons, quizzes, and progress tracking, offering a smart and modern approach to personalized education.`,
//     logo: " ",
//     caseStudy: "Empowering students with accessible and adaptive learning.",
//     image: teechaa,
//     git: { icon: SiPrivateinternetaccess, url: "#" },
//     liveDemo: "https://teechaa.com/",
//     languages: [
//       { icon: FaReact, name: "React" },
//       { icon: IoLogoJavascript, name: "JavaScript" },
//       { icon: SiExpress, name: "Express.js" },
//       { icon: SiMongodb, name: "MongoDB" },
//       { icon: FaNode, name: "Node.js" }
//     ]
//   }
];
