const Footer = () => {
    return (
        <div id="footer" className="border-t-[1px] w-[100%] mt-20  pt-[32px]  flex justify-center">
            <div className="w-[1024px] flex justify-between border-[var(--menu-inactive)] flex-wrap ">
                <div className="left w-[470px]">
                    <div className="left flex gap-2 items-center font-bold text-white text-[24px]">
                        <div className="img">
                            <img src={require('../../resources/Logo.png')} alt='' width={24} height={24} />
                        </div>
                        PhongND
                        <span className="ml-5 text-[16px] text-[var(--menu-inactive)]">phongnd@boostgo.com</span>
                    </div>
                    <p className="text-[16px] text-white mt-5">Web designer and front-end developer PhongND</p>
                </div>
                <div className="right">
                    <p className="text-white font-[500] text-[24px]">Media</p>
                    <div className="media flex mt-2 gap-3">
                        <img src={require('../../resources/imgs/Github.png')} alt='' width={30} height={30} />
                        <img src={require('../../resources/imgs/Figma.png')} alt='' width={30} height={30} />
                        <img src={require('../../resources/imgs/Discord.png')} alt='' width={30} height={30} />
                    </div>
                </div>
                <div className="text-[var(--menu-inactive)] copyright w-[100%] text-center mt-10">
                    © Copyright 2022. Made by PhongND
                </div>
            </div>

        </div>
    );
}
export default Footer;