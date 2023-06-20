import { useEffect, useState } from 'react';
import BreadScrum from "../../components/bread-scrum/BreadScrum";
import ProjectsApps from "../../views/projects/ProjectsApps";
import { Card } from '../../components/card-project/ProjectCard';
import { SmallCard } from '../../components/card-project/SmallProjectCard';
import SmallProjects from '../../views/projects/SmallProjects';
import { projectsDb } from '../../@core/db/projects';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Card[]>([]);
    const [smallPrs, setSmallPrs] = useState<SmallCard[]>([]);
    useEffect(() => {
        const list: Card[] = projectsDb;
        const listSmall: SmallCard[] = [
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 1,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 2,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 3,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 4,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 5,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 6,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 7,
            },
            {
                title: "ChertNodes",
                content: "Minecraft servers hosting",
                brief: "HTML SCSS Python Flask",
                id: 8,
            }
        ];
        setSmallPrs(listSmall);
        setProjects(list);
    }, []);
    return (
        <>
            <BreadScrum path={"projects"} desc='List of my projects'/>
            <ProjectsApps projects={projects} />
            <SmallProjects projects={smallPrs} />
        </>
    );
}
export default ProjectsPage;