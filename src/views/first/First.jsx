import { useTranslation } from 'react-i18next';
import './style.css';

const First = () => {
    const { t } = useTranslation();
    return (
        <div id="first" className="flex items-center gap-6">
            <div className="left">
                <p className="intro text-white font-bold text-[32px]">
                    PhongND {t('is')} <span>Fullstack web developer</span> {t('and')} <span>Mobile developer</span>
                </p>
                <p className="mt-8 desc text-[16px] text-[#ABB2BF] font-[400] leading-[25px]">
                    {t('brief')}
                </p>
                <a href='/contacts'>
                    <div className='text-white mt-5 border-[1px] inline-block px-[8px] py-[5px] transition duration-300 hover:text-[var(--color-menu-violet)] hover:border-[var(--color-menu-violet)] cursor-pointer'>
                        {t('contact_me')} !!
                    </div>
                </a>
            </div>
            <div className="right">
                <img style={{ width: 460, borderBottomLeftRadius: 180 }} src={require('./imgs/avatar-portfolio.png')} alt='' />
                <div className=''>
                    <div className='flex border-[1px] items-center pl-2 justify-center'>
                        <input type='color' className='p-[0]' hidden />
                        <div className='w-[18px] h-[18px] bg-[#C778DD]' />
                        <p className='text-white ml-2 py-2'><span className='text-[#ABB2BF]'>{t('current_working')}</span> BoostGo</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default First;