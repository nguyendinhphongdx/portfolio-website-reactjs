import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import './style.css';
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
        const _miv = menu.map((nav, i) => <li key={i} className={nav.link === location.pathname ? 'active' : ''}><Link to={nav.link}><span>#</span>{nav.title}</Link></li>);
        setNav(_miv);
    }, [location.pathname]);

    return (
        <div id='header' className={["fixed top-0 left-0 right-0 pt-[32px] pb-[12px] z-[99] transition duration-300", isTop ? '' : 'active'].join(' ')}>
            <div className="max-w-[1024px] m-auto flex justify-between">
                <div className="left flex gap-2 items-center font-bold text-white">
                    <div className="img">
                        <img src={require('../../resources/Logo.png')} alt='' />
                    </div>
                    Elias
                </div>
                <div className="right ">
                    <ul className='menu flex gap-5 text-white'>
                        {navs}
                    </ul>
                </div>

            </div>
        </div>
    );
}
export default Navbar;