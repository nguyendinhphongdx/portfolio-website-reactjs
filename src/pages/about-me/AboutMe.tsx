import { useEffect, useState } from 'react';
import BreadScrum from "../../components/bread-scrum/BreadScrum";
import AboutMe from '../../views/about/Aboutme';
import FunFacts from '../../views/skills/FunFacts';
import { SkillCardProps } from '../../views/skills/Skill';
import SkillHorizontal from '../../views/skills/SkillHor';
import { skillDb } from '../../@core/db/skills';

const AboutPage = () => {
    const [skills, setSkill] = useState<SkillCardProps[]>([]);
    const [facts, setFacts] = useState<string[]>([]);
    useEffect(() => {
        const list: SkillCardProps[] = Object.values(skillDb).flat(1);
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