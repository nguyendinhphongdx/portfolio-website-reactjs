import React, { useEffect, useState } from 'react';
import AboutMe from "../../views/about/Aboutme";
import Contact from "../../views/contact/Contact";
import First from "../../views/first/First";
import Project from "../../views/projects/Project";
import Quote from "../../views/quote/Quote";
import Skill from "../../views/skills/Skill";
import { Card } from '../../components/card-project/ProjectCard';

const HomePage = () => {
    const [projects, setProjects] = useState<Card[]>([]);
    useEffect(() => {
        const list: Card[] = [{
            title: "8icle",
            content: "Information scanning and analysis tool",
            brief: "HTML SCSS NextJS ReactJS tailwind JavaScript TypeScript",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 1,
            href: "https://8icle.com/"
        },
        {
            title: "Website rent Hotel",
            content: "Hotel reservation system (FrontEnd)",
            brief: "HTMl CSS Javascript Boostrap JQuery",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 7,
            source: "https://github.com/nguyendinhphongdx/Website-Rent-Hotel",
            href: "https://nguyendinhphongdx.github.io/Website-Rent-Hotel/"
        },
        {
            title: "DBiz Stop, DBiz Driver, DBiz Mng",
            content: "Hotel reservation system (FrontEnd)",
            brief: "HTMl CSS Javascript Boostrap JQuery",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 8,
            source: "https://github.com/nguyendinhphongdx/Website-Rent-Hotel",
            href: "https://nguyendinhphongdx.github.io/Website-Rent-Hotel/"
        },
        {
            title: "Messenger Clone",
            content: "Application similar to facebook messenger, allowing users to message",
            brief: "HTML SCSS NextJS ReactJS tailwind JavaScript TypeScript",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 2,
            href: "https://messenger-clone-pi-azure.vercel.app/",
            source: "https://github.com/nguyendinhphongdx/messenger-clone",
        },
        {
            title: "Zing MP3",
            content: "Online music player application",
            brief: "HTML SCSS NextJS ReactJS tailwind JavaScript",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 3,
            href: "https://zing-mp3-phi.vercel.app/",
            source: "https://github.com/nguyendinhphongdx/zing-mp3"
        },
        {
            title: "Tiktok Clone",
            content: "The app is a tiktok social network",
            brief: "HTML SCSS NextJS ReactJS tailwind JavaScript NodeJS MongoDB TypeScript",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 4,
            href: "https://chipper-creponne-410cfa.netlify.app/",
            source: "https://github.com/nguyendinhphongdx/tiktok-clone"
        },
        {
            title: "KhoaBang Acedemy",
            content: "Mobile application to manage students at KhoaBang Acedemy",
            brief: "Android Java NodeJS MYSQL",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 5,
            source: "https://github.com/nguyendinhphongdx/Scientific"
        },
        {
            title: "Template app mobile ReactNative",
            content: "Support building the base for reactnative applications quickly",
            brief: "Javascript ReactNative",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 6,
            source: "https://github.com/nguyendinhphongdx/ReactNativeTemplateBaseTS"
        },
        
        ];
        setProjects(list);
    }, []);

    return (
        <>
            <First />
            <Quote />
            <Project projects={projects} />
            <Skill />
            <AboutMe />
            <Contact />
        </>
    );
};
export default HomePage;