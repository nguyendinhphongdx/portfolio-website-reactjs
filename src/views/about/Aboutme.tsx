import TitleSection from "../../components/title-section/TitleSection";
import './style.css';

const AboutMe = ({ hideMore, hideTitle }: { hideMore?: boolean, hideTitle?: boolean }) => {
    return (
        <div id="about-me">
            {hideTitle ? null : <TitleSection title={'about-me'} width={500} hideMore={true} />}
            <div className="flex gap-2 justify-between">
                <div className="left w-[515px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="text-[16px] text-[var(--menu-inactive)]">Hello, i’m PhongND!
                        I’m a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
                        <br /> <br />Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
                    </p>
                    {
                        hideMore ? null : <div className="transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-pointer border-[1px] p-[6px] text-white inline-block">{'Read more ->'}</div>
                    }
                </div>
                <div className="right">
                    <img className="w-[330px] h-[480px]" src={require('../../resources/imgs/about-me/right.png')} alt="" />
                </div>
            </div>
        </div>
    );
}
export default AboutMe;