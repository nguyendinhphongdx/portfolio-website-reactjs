import { Link } from "react-router-dom";
import TitleSection from "../../components/title-section/TitleSection";
import './style.css';
import { useTranslation } from "react-i18next";

const AboutMe = ({ hideMore, hideTitle }: { hideMore?: boolean, hideTitle?: boolean }) => {
    const { t } = useTranslation();
    return (
        <div id="about-me">
            {hideTitle ? null : <TitleSection title={t('about-me')} width={500} hideMore={true} />}
            <div className="flex gap-2 justify-between">
                <div className="left md:w-[100%] w-[515px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="md:text-[14px] lg:text-[16px] text-[var(--menu-inactive)]">
                        {t('about-me_1')}
                        <br />
                        <br />
                        {t('about-me_2')}
                    </p>
                    {
                        hideMore ? null : (
                            <Link to={"/about-me"} className="hidden md:block lg:block">
                                <div className="md:text-[14px] lg:text-[16px] transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-pointer border-[1px] p-[6px] text-white inline-block">
                                    {t('read_more')+' ->'}
                                    </div>
                            </Link>
                        )
                    }
                </div>
                <div className="right">
                    <img className="w-[180px] md:w-[260px] lg:w-[330px]" src={require('../../resources/imgs/about-me/avt2.png')} alt="" />
                </div>
            </div>
        </div>
    );
}
export default AboutMe;