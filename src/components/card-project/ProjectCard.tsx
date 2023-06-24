export interface Card {
    title: string;
    content: string;
    brief: string;
    img: any;
    id: string | number;
    href?: string;
    source?: string;
}
const ProjectCard = ({ img, title, content, brief, id, href, source }: Card) => {
    return (
        <div key={id} className="border-[1px] border-[#ABB2BF] w-[300px] lg:w-[330px] pb-[20px] flex flex-wrap">
            <div className="img w-[100%]">
                <img className="w-[100%] h-[200px]" src={img} alt="" />
            </div>
            <p className="text-[16px] text-[var(--menu-inactive)] px-[10px] py-[8px]">{brief}</p>
            <p className="text-white font-[500] text-[24px] px-[10px] py-[8px] border-y-[1px] w-[100%]">{title}</p>
            <p className="text-[16px] text-[var(--menu-inactive)] px-[10px] py-[8px]">{content}</p>
            <div className="flex px-[10px] gap-4">
                <a target="_blank" href={href} rel="noreferrer">
                    <div className={`h-[fit-content] text-white px-[10px] py-[8px] border-[1px] transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-${href ? 'pointer' : 'not-allowed'}`}>
                        Live Demo {'<~~>'}
                    </div>
                </a>
                <a target="_blank" href={source} rel="noreferrer">
                    <div
                        className={`h-[fit-content] text-white px-[10px] py-[8px] border-[1px] transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-${source ? 'pointer' : 'not-allowed'}`}>
                        Code {'>='}
                    </div>
                </a>
            </div>
        </div>
    );
}
export default ProjectCard;