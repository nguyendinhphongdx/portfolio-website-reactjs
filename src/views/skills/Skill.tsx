import { useTranslation } from "react-i18next";
import { skillDb } from "../../@core/db/skills";
import TitleSection from "../../components/title-section/TitleSection";

const Skill = () => {
    const list = skillDb;
    const { t } = useTranslation();
    return (
        <div id="skills">
            <TitleSection title={t('skills')} width={300} href={'about-me'}/>
            <div className="flex justify-between">
                <div className="left">
                    <img src={require('../../resources/imgs/skills/left.png')} alt="" />
                </div>
                <div className="right flex gap-5 flex-wrap">
                    <div className="col-left">
                        {list.left.map((skill, i) => CardSkills({ title: skill.title, skills: skill.skills, id: 'l-' + i }))}
                    </div>
                    <div className="col-center">
                        {list.center.map((skill, i) => CardSkills({ title: skill.title, skills: skill.skills, id: 'c-' + i }))}
                    </div>
                    <div className="col-right">
                        {list.right.map((skill, i) => CardSkills({ title: skill.title, skills: skill.skills, id: 'r-' + i }))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skill;
export interface SkillCardProps {
    title: string;
    skills: string[];
    id: string | number;
}
export const CardSkills = ({ title, skills, id }: SkillCardProps) => {
    return (
        <div key={id} className="border-[1px] mt-3 h-[fit-content]">
            <p className="pl-2 pr-6 text-white border-b-[1px] py-2">{title}</p>
            <ul className="pl-2 pr-6 py-2">
                {skills.map((s, index) => <li key={index} className="py-[2px] text-[var(--menu-inactive)]">{s}</li>)}
            </ul>
        </div>
    );
};