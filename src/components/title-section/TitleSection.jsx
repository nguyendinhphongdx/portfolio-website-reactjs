const TitleSection = (props) => {
    const { title, hideMore, href } = props;
    return (
        <div id="projects" className="flex items-center justify-between mt-[80px] mb-[40px]">
            <div className="left flex items-center gap-2">
                <p className="text-white text-[32px]"><span>#</span>{title}</p>
                <div className={`w-[500px] h-[1px] bg-[#C778DD]`}></div>
            </div>
            {
                hideMore ? null : <div className="right text-white cursor-pointer">
                    <a href={href ?? '#'}>{'View all ~~>'}</a>
                </div>
            }
        </div>
    );
}
export default TitleSection;