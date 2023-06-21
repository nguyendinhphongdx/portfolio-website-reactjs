import { useTranslation } from "react-i18next";
import BreadScrum from "../../components/bread-scrum/BreadScrum";
import TitleContent from "../../components/title-content/TitleContent";

const ContactPage = () => {
    const {t} = useTranslation();
    return (
        <>
            <BreadScrum path={t('contacts')} desc={t('who_am_i')} />
            <div className="flex gap-2 justify-between">
                <div className="left w-[505px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="text-[16px] text-[var(--menu-inactive)]">
                       {t('contacts_des')}
                    </p>
                </div>
                <div className="right flex gap-2">
                    <div className="box border-[1px] p-5 h-[fit-content]">
                        <p className="text-white font-bold">{t('phone')}</p>
                        <ul className="pt-5">
                            <li className="flex items-center gap-2 text-[var(--menu-inactive)]">
                                +84 352337342
                            </li>
                        </ul>
                    </div>
                    <div className="box border-[1px] p-5">
                        <p className="text-white font-bold">{t('messege_me')}</p>
                        <ul className="pt-5">
                            <li className="flex items-center gap-2 text-[var(--menu-inactive)]">
                                <img src={require('../../resources/imgs/contact/Discord.png')} alt="" /> !PhongND#3519
                            </li>
                            <li className="flex items-center gap-2 text-[var(--menu-inactive)]">
                                <img src={require('../../resources/imgs/contact/Email.png')} alt="" /> phongnguyendx@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <TitleContent content={t("all_media")} />
            <div className="flex gap-2">
                <div className="icon flex justify-center items-center gap-2  text-[#ABB2BF]">
                    <img src={require('../../resources/imgs/twitter.png')} alt="" /> @phongnd
                </div>
                <div className="icon flex justify-center items-center gap-2 text-[#ABB2BF]">
                    <img src={require('../../resources/imgs/twitter.png')} alt="" /> @phongnd
                </div>
            </div>
        </>
    );
}
export default ContactPage;