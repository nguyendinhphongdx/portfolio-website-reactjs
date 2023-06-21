import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import './style.css';
import { useTranslation } from "react-i18next";
const menu = [
    {
        title: 'home',
        link: '/'
    },
    {
        title: 'projects',
        link: '/projects'
    },
    {
        title: 'about-me',
        link: '/about-me'
    },
    {
        title: 'contacts',
        link: '/contacts'
    }
];
const Navbar = () => {
    const [isTop, setTop] = useState(true);
    const [navs, setNav] = useState([]);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    console.log(i18n.language);
    const translateMenu = (t) => {
        return menu.map(menu => {
            return {
                title: t(`menu_${menu.title}`),
                link: menu.link
            }
        })
    }

    useEffect(() => {
        window.onscroll = function () {
            if (window.scrollY === 0) {
                setTop(true);
            } else {
                setTop(false);
            }
        }
        return () => {
            window.onscroll = null;
        };
    }, []);

    useEffect(() => {
        const _miv = translateMenu(t).map((nav, i) => <li key={i} className={nav.link === location.pathname ? 'active' : ''}><Link to={nav.link}><span>#</span>{nav.title}</Link></li>);
        setNav(_miv);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname , t]);

    return (
        <div id='header' className={["fixed top-0 left-0 right-0 pt-[32px] pb-[12px] z-[99] transition duration-300", isTop ? '' : 'active'].join(' ')}>
            <div className="max-w-[1024px] m-auto flex justify-between">
                <Link to={'/'}>
                    <div className="left flex gap-2 items-center font-bold text-white">
                        <div className="img">
                            <img src={require('../../resources/Logo.png')} alt='' />
                        </div>
                        PhongND
                    </div>
                </Link>
                <div className="right flex gap-10 text-white">
                    <ul className='menu flex gap-5 '>
                        {navs}
                    </ul>
                    <div className="flex gap-1">
                    <button onClick={()=> i18n.changeLanguage('vi')} className={["flex gap-1 transition duration-300 hover:border-blue-300 hover:border-b-2 hover:text-blue-300", i18n.language === 'vi' ? 'text-blue-300' : ''].join(' ')}>VN <img src={require('../../resources/imgs/flag-vn.png')} alt='' style={{ width: 25 }} /></button>
                    |
                    <button onClick={()=> i18n.changeLanguage('en')} className={["flex gap-1 transition duration-300 hover:border-blue-300 hover:border-b-2 hover:text-blue-300", i18n.language === 'en' ? 'text-blue-300' : ''].join(' ')}>EN <img src={require('../../resources/imgs/flag-us.png')} alt='' style={{ width: 25 }} /></button>
                </div>
            </div>

        </div>
        </div >
    );
}
export default Navbar;