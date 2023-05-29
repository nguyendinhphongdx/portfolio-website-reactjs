import ProjectCard from "../../components/card-project/ProjectCard";
import TitleSection from "../../components/title-section/TitleSection";

const Project = () => {
    const projects = [
        {
            title: "ChertNodes",
            content: "Minecraft servers hosting",
            brief: "HTML SCSS Python Flask",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
        },
        {
            title: "ChertNodes",
            content: "Minecraft servers hosting",
            brief: "HTML SCSS Python Flask",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
        },
        {
            title: "ChertNodes",
            content: "Minecraft servers hosting",
            brief: "HTML SCSS Python Flask",
            img: require('../../resources/imgs/projects/cherfnodes.jpg'),
        }
    ];
    const listProjects = () => {
        return projects.map(project => ProjectCard(project));
    };

    return (
        <div id="projects">
            <TitleSection title={'projects'} width={500} />
            <div className="flex gap-2 justify-evenly">
            {listProjects()}
            </div>
        </div>
    );
}
export default Project;