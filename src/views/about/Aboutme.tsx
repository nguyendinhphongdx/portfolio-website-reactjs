import TitleSection from "../../components/title-section/TitleSection";
import './style.css';

const AboutMe = ({ hideMore, hideTitle }: { hideMore?: boolean, hideTitle?: boolean }) => {
    return (
        <div id="about-me">
            {hideTitle ? null : <TitleSection title={'about-me'} width={500} hideMore={true} />}
            <div className="flex gap-2 justify-between">
                <div className="left w-[515px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="text-[16px] text-[var(--menu-inactive)]">
                        Hi, I'm PhongND! I am a self-taught fullstack developer in Hanoi, Vietnam. I can develop responsive websites, mobile apps from user experience to responsive functionality.
                        <br />
                        <br />
                        I have 3 years of experience in programming. I have been helping many clients establish their presence online. I am always trying to learn about the latest technologies and frameworks.
                    </p>
                    {
                        hideMore ? null : <div className="transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-pointer border-[1px] p-[6px] text-white inline-block">{'Read more ->'}</div>
                    }
                </div>
                <div className="right">
                    <img className="w-[330px]" src={require('../../resources/imgs/about-me/avt2.png')} alt="" />
                </div>
            </div>
        </div>
    );
}
export default AboutMe;