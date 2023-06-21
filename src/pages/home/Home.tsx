import React, { useEffect, useState } from 'react';
import AboutMe from "../../views/about/Aboutme";
import Contact from "../../views/contact/Contact";
import First from "../../views/first/First";
import Project from "../../views/projects/Project";
import Quote from "../../views/quote/Quote";
import Skill from "../../views/skills/Skill";
import { Card } from '../../components/card-project/ProjectCard';
import { projectsDb } from '../../@core/db/projects';

const HomePage = () => {
    const [projects, setProjects] = useState<Card[]>([]);
    
    useEffect(() => {
        const list: Card[] = projectsDb.slice(0,3);
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