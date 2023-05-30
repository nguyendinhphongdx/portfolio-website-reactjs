import TitleContent from "../../components/title-content/TitleContent";
import { CardSkills, SkillCardProps } from "./Skill";

const SkillHorizontal = ({ skills }: { skills: SkillCardProps[] }) => {
    const list = skills.map((skill) => CardSkills(skill));
    return (
        <>
            <TitleContent content="skills" />
            <div className="flex gap-2">
                {list}
            </div>
        </>

    );
}
export default SkillHorizontal;