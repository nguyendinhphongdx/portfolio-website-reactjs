import TitleSection from "../../components/title-section/TitleSection";

const Skill = () => {
    const list = {
        left: [
            {
                title: 'Languages',
                skills: ['Typescript Lua', 'Python JavaScript'],
            },
        ],
        center: [
            {
                title: 'Databases',
                skills: ['SQLite postgreSQL', 'Mongo'],
            },
            {
                title: 'Other',
                skills: ['HTML CSS EJS SCSS', 'REST JINJA'],
            }
        ],
        right: [
            {
                title: 'Tools',
                skills: ['VSCode Neovim Linux', 'Figma XFCE Arch', 'Git Font Awesome'],
            },
            {
                title: 'Frameworks',
                skills: ['React Vue', 'Disanake', 'Discord.js', 'Flask Express.js'],
            }
        ]
    };
    return (
        <div id="skills">
            <TitleSection title={'skill'} width={300} />
            <div className="flex justify-between">
                <div className="left">
                    <img src={require('../../resources/imgs/skills/left.png')} alt="" />
                </div>
                <div className="right flex gap-5">
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