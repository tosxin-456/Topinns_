import { FaGithub } from "react-icons/fa";
import { IconType } from "react-icons";
import {  FaPython } from "react-icons/fa";



interface Projects {
  index: number;
  title: string;
  image: string | { type: string; src: string };
  liveDemo: string;
  git: { icon: IconType; url: string };
  languages: { icon: IconType; name: string }[];
}


export const games: Projects[] = [
  {
    index: 1,
    title: "Snake Game",
    image: {
      type: "iframe",
      src: "https://www.youtube.com/embed/GYHMlGAlsY0?si=aiXlI1JtVctNGWE8",
    },
    git: {
      icon: FaGithub,
      url: "https://github.com/tosxin-456/snake",
    }, //
    liveDemo: "https://diamond-dreams-umber.vercel.app",
    languages: [{ icon: FaPython, name: "Python" }],
  },
];
