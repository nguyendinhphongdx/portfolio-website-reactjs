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
                        <span className="ml-5 text-[16px] text-[var(--menu-inactive)]">phongnguyendx@gmail.com</span>
                    </div>
                    <p className="text-[16px] text-white mt-5">Fullstack developer PhongND</p>
                </div>
                <div className="right">
                    <p className="text-white font-[500] text-[24px]">Media</p>
                    <div className="media flex mt-2 gap-3">
                        <a href="https://github.com/nguyendinhphongdx" target='_blank' rel="noreferrer">
                            <img src={require('../../resources/imgs/Github.png')} alt='' width={28} height={28} />
                        </a>
                        <a href="https://www.facebook.com/phongmongcong.2606/" target='_blank' rel="noreferrer">
                            <img src={require('../../resources/imgs/Facebook.png')} alt='' width={32} height={32} />
                        </a>
                        <a href='https://www.tiktok.com/@nguyendinhphong2606' target='_blank' rel="noreferrer">
                            <img src={require('../../resources/imgs/Tiktok.png')} alt='' width={28} height={28} />
                        </a>
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