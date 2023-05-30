import TitleContent from "../../components/title-content/TitleContent";

const FunFacts = (props: { facts: string[] }) => {
    const list = props.facts.map((f, i) => {
        return (
            <div key={i} className="border-[1px] py-1 px-3 inline-block text-white">
                {f}
            </div>
        );
    })
    return (
        <div className="mb-20">
            <TitleContent content="my-fun-facts" />
            <div className="flex justify-between items-center">
                <div className="left flex flex-wrap gap-3">
                    {list}
                </div>
                <div className="right">
                    <img style={{ maxWidth: 'unset' }} src={require('../../resources/imgs/facts.png')} alt="" width={178} height={170} />
                </div>
            </div>
        </div>
    );
}
export default FunFacts;