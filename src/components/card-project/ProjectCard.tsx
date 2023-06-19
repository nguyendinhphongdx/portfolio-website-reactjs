export interface Card {
    title: string;
    content: string;
    brief: string;
    img: any;
    id: string | number;
    href?: string;
    source?: string;
}
const ProjectCard = ({ img, title, content, brief, id }: Card) => {
    return (
        <div key={id} className="border-[1px] border-[#ABB2BF] w-[330px] pb-[20px]">
            <div className="img">
                <img src={img} alt="" />
            </div>
            <p className="text-[16px] text-[var(--menu-inactive)] px-[10px] py-[8px]">{brief}</p>
            <p className="text-white font-[500] text-[24px] px-[10px] py-[8px] border-y-[1px]">{title}</p>
            <p className="text-[16px] text-[var(--menu-inactive)] px-[10px] py-[8px]">{content}</p>
            <div className="flex px-[10px] gap-4">
                <div
                    className="text-white px-[10px] py-[8px] border-[1px] transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-pointer">
                    Live {'<~~>'}
                </div>
                <div
                    className="text-white px-[10px] py-[8px] border-[1px] transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-pointer">
                    Cached {'>='}
                </div>
            </div>
        </div>
    );
}
export default ProjectCard;