import TitleSection from "../../components/title-section/TitleSection";

const Contact = () => {
    return (
        <div id="contact">
            <TitleSection title={'contacts'} width={300} hideMore={true}/>
            <div className="flex gap-2 justify-between">
                <div className="left w-[505px] mt-5 flex items-center leading-[28px] flex-wrap">
                    <p className="text-[16px] text-[var(--menu-inactive)]">
                    I’m interested in freelance opportunities. However, if you have other request or question, don’t hesitate to contact me
                    </p>
                </div>
                <div className="right">
                        <div className="box border-[1px] p-5">
                            <p className="text-white font-bold">Message me here</p>
                            <ul className="pt-5">
                                <li className="flex items-center gap-2 text-[var(--menu-inactive)]">
                                    <img src={require('../../resources/imgs/contact/Discord.png')} alt=""/> !Elias#3519
                                </li>
                                <li  className="flex items-center gap-2 text-[var(--menu-inactive)]">
                                    <img src={require('../../resources/imgs/contact/Email.png')} alt=""/> elias@elias.me
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
