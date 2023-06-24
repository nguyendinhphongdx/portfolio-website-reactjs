const TitleContent = ({ content }: { content: string }) => {
    return (
        <div  className="mt-20 mb-10">
            <p className="title text-[32px] font-bold text-white"><span>#</span>{content}</p>
        </div>
    );
};

export default TitleContent;