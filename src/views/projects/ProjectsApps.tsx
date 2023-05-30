import ProjectCard, { Card } from "../../components/card-project/ProjectCard";
import TitleContent from "../../components/title-content/TitleContent";

const ProjectsApps = ({ projects }: { projects: Card[] }) => {
    const listProjects = () => {
        return projects.map((project, index) => ProjectCard(project));
    };
    return (
        <>
            <TitleContent content="complete-apps" />
            <div className="flex justify-center">
                <div className="flex gap-2 justify-start flex-wrap pl-[5px]">
                    {listProjects()}
                </div>
            </div>
        </>
    );
}
export default ProjectsApps;