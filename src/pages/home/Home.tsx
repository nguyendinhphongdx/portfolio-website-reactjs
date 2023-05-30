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
            title: "ChertNodes",
            content: "Minecraft servers hosting",
            brief: "HTML SCSS Python Flask",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 1,
        },
        {
            title: "ChertNodes",
            content: "Minecraft servers hosting",
            brief: "HTML SCSS Python Flask",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 2,
        },
        {
            title: "ChertNodes",
            content: "Minecraft servers hosting",
            brief: "HTML SCSS Python Flask",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
            id: 3,
        }];
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