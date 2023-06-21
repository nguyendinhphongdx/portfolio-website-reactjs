import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TitleSection = (props) => {
    const { title, hideMore, href } = props;
    const { t } = useTranslation();
    return (
        <div id="projects" className="flex items-center justify-between mt-[80px] mb-[40px]">
            <div className="left flex items-center gap-2">
                <p className="text-white text-[32px]"><span>#</span>{title}</p>
                <div className={`w-[500px] h-[1px] bg-[#C778DD]`}></div>
            </div>
            {
                hideMore ? null : <div className="right text-white cursor-pointer">
                    <Link to={href ?? '#'}>
                        {t('view_all') + ' ~~>'}
                    </Link>
                </div>
            }
        </div>
    );
}
export default TitleSection;