const Decoration = () => {
    return (
        <div id="decoration" className="decoration absolute top-0 left-[80px] flex flex-col items-center">
            <div className="line h-[200px] w-[2px] bg-[#ABB2BF]"></div>
            <div className="application flex flex-col gap-[2px]">
                <a  href="https://github.com/nguyendinhphongdx" target='_blank'  rel="noreferrer">
                    <img src={require('../../resources/imgs/Github.png')} alt='' width={28} height={28} />
                </a>
                <a target='_blank' href="https://www.facebook.com/phongnd.fullstack/" rel="noreferrer">
                    <img src={require('../../resources/imgs/Facebook.png')} alt='' width={32} height={32} />
                </a>
                <a href='https://www.tiktok.com/@nguyendinhphong2606' target='_blank' rel="noreferrer">
                    <img src={require('../../resources/imgs/Tiktok.png')} alt="" width={30} height={30}/>
                </a>
            </div>
        </div>
    );
}
export default Decoration;