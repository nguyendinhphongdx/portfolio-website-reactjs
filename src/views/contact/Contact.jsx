import { useTranslation } from "react-i18next";
import TitleSection from "../../components/title-section/TitleSection";

const Contact = () => {
    const { t } = useTranslation();
    return (
        <div id="contact">
            <TitleSection title={t('contacts')} width={300} hideMore={true} />
            <div className="flex gap-2 sm:justify-between flex-wrap justify-center">
                <div className="left w-[505px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="md:text-[14px] lg:text-[16px] text-[var(--menu-inactive)]">
                        {t('contacts_des')}
                    </p>
                </div>
                <div className="right">
                    <div className="box border-[1px] p-5">
                        <p className="text-white font-bold md:text-[14px] lg:text-[16px]">{t('messege_me')}</p>
                        <ul className="pt-5">
                            <li className="flex-wrap flex items-center gap-2 text-[var(--menu-inactive)] md:text-[14px] lg:text-[15px]">
                                <img src={require('../../resources/imgs/contact/Discord.png')} alt="" /> <p className="sm:w-[100%]">!PhongND#3519</p>
                            </li>
                            <li className="flex-wrap flex items-center gap-2 text-[var(--menu-inactive)] md:text-[14px] lg:text-[15px]">
                                <img src={require('../../resources/imgs/contact/Email.png')} alt="" /> <p className="sm:w-[100%]">phongnguyendx@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
