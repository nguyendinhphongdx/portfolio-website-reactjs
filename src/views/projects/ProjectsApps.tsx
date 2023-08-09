import ProjectCard, { Card } from "../../components/card-project/ProjectCard";
import TitleContent from "../../components/title-content/TitleContent";

const ProjectsApps = ({ projects, title }: { projects: Card[], title: string }) => {
    const listProjects = () => {
        return projects.map((project, index) => ProjectCard(project));
    };
    return (
        <>
            <TitleContent content={title} />
            <div className="flex justify-center">
                <div className="flex gap-2 justify-center flex-wrap pl-[5px]">
                    {listProjects()}
                </div>
            </div>
        </>
    );
}
export default ProjectsApps;