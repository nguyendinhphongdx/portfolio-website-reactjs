import SmallProjectCard, { SmallCard } from "../../components/card-project/SmallProjectCard";
import TitleContent from "../../components/title-content/TitleContent";

const SmallProjects = ({ projects, title }: { projects: SmallCard[], title: string }) => {
    const listProjects = () => {
        return projects.map((project, index) => SmallProjectCard(project));
    };
    return (
        <>
            <TitleContent content={title} />
            <div className="flex justify-center">
                <div className="flex gap-3 justify-start flex-wrap pl-[5px]">
                    {listProjects()}
                </div>
            </div>
        </>
    );
}
export default SmallProjects;