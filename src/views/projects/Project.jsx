import ProjectCard from "../../components/card-project/ProjectCard";
import TitleSection from "../../components/title-section/TitleSection";

const Project = (props) => {
    const listProjects = () => {
        return props.projects.map((project, index) => ProjectCard({...project, id: index}));
    };
    return (
        <div id="projects">
            <TitleSection title={'projects'} width={500} href="/projects"/>
            <div className="flex gap-2 justify-evenly flex-wrap">
            {listProjects()}
            </div>
        </div>
    );
}
export default Project;