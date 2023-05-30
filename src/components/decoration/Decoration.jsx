const Decoration = () => {
    return(
        <div id="decoration" className="decoration absolute top-0 left-[80px] flex flex-col items-center">
            <div className="line h-[200px] w-[2px] bg-[#ABB2BF]"></div>
            <div className="application flex flex-col">
                <img src={require('../../resources/imgs/Github.png')} alt=""/>
                <img src={require('../../resources/imgs/Dribble.png')} alt=""/>
                <img src={require('../../resources/imgs/Figma.png')} alt=""/>
            </div>
        </div>
    );
}
export default Decoration;