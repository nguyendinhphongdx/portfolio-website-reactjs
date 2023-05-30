const BreadScrum = ({ path, desc }: { path: string, desc: string }) => {
    return (
        <div>
            <p className="text-[32px] font-bold text-white"><span>/</span>{path}</p>
            <p className="text-[var(--menu-inactive)]">{desc}</p>
        </div>
    );
};

export default BreadScrum;