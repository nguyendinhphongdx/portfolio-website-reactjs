import { useEffect, useState } from 'react';
import BreadScrum from "../../components/bread-scrum/BreadScrum";
import AboutMe from '../../views/about/Aboutme';
import FunFacts from '../../views/skills/FunFacts';
import { SkillCardProps } from '../../views/skills/Skill';
import SkillHorizontal from '../../views/skills/SkillHor';

const AboutPage = () => {
    const [skills, setSkill] = useState<SkillCardProps[]>([]);
    const [facts, setFacts] = useState<string[]>([]);
    useEffect(() => {
        const list: SkillCardProps[] = [
            {
                title: "Languages",
                id: 1,
                skills: ['Typescript Lua', 'Python JavaScript'],
            },
            {
                title: 'Databases',
                skills: ['SQLite postgreSQL', 'Mongo'],
                id: 2,
            },
            {
                title: 'Tools',
                skills: ['VSCode Neovim Linux', 'Figma XFCE Arch', 'Git Font Awesome'],
                id: 4,
            },
            {
                title: 'Other',
                skills: ['HTML CSS EJS SCSS', 'REST JINJA'],
                id: 3,
            },
            {
                title: 'Frameworks',
                skills: ['React Vue', 'Disanake', 'Discord.js', 'Flask Express.js'],
                id: 5,
            }
        ];
        const _facts: string[] = [
            'I like winter more than summer',
            'I often bike with my friends',
            'I like pizza and pasta',
            'I was in Egypt, Poland and Turkey',
            'I’m still studing in school',
            'My favorite movie is The Green Mile',
            'I don’t have any siblings'
        ]
        setSkill(list);
        setFacts(_facts);
    }, []);


    return (
        <>
            <BreadScrum path={"about-me"} desc='Who am I?' />
            <AboutMe hideMore={true} hideTitle={true} />
            <SkillHorizontal skills={skills} />
            <FunFacts facts={facts} />
        </>
    );
}
export default AboutPage;