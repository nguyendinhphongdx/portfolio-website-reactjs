import { useEffect, useState } from 'react';
import BreadScrum from "../../components/bread-scrum/BreadScrum";
import ProjectsApps from "../../views/projects/ProjectsApps";
import { Card } from '../../components/card-project/ProjectCard';
import { SmallCard } from '../../components/card-project/SmallProjectCard';
import SmallProjects from '../../views/projects/SmallProjects';
import { projectsDb } from '../../@core/db/projects';
import { useTranslation } from 'react-i18next';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Card[]>([]);
    const [smallPrs, setSmallPrs] = useState<SmallCard[]>([]);
    const { t } = useTranslation();

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
            <BreadScrum path={t('projects')} desc={t('list_my_projects')} />
            <ProjectsApps projects={projects} title={t('complete_apps')}/>
            <SmallProjects projects={smallPrs} title={t('small_projects')}/>
        </>
    );
}
export default ProjectsPage;