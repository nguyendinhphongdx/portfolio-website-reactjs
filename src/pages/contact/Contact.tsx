import BreadScrum from "../../components/bread-scrum/BreadScrum";
import TitleContent from "../../components/title-content/TitleContent";

const ContactPage = () => {
    return (
        <>
            <BreadScrum path={"contacts"} desc='Who am I?' />
            <div className="flex gap-2 justify-between">
                <div className="left w-[505px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="text-[16px] text-[var(--menu-inactive)]">
                        I’m interested in freelance opportunities. However, if you have other request or question, don’t hesitate to contact me
                    </p>
                </div>
                <div className="right flex gap-2">
                    <div className="box border-[1px] p-5 h-[fit-content]">
                        <p className="text-white font-bold">Support me here</p>
                        <ul className="pt-5">
                            <li className="flex items-center gap-2 text-[var(--menu-inactive)]">
                                +84 352337342
                            </li>
                        </ul>
                    </div>
                    <div className="box border-[1px] p-5">
                        <p className="text-white font-bold">Message me here</p>
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
            <TitleContent content="all-media" />
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