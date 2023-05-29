import './style.css';
const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 pt-[32px] pb-[8px]">
            <div className="max-w-[1024px] m-auto flex justify-between">
                <div className="left flex gap-2 items-center font-bold text-white">
                    <div className="img">
                        <img src={require('./imgs/Logo.png')} alt='' />
                    </div>
                    Elias
                </div>
                <div className="right ">
                    <ul className='menu flex gap-5 text-white'>
                        <li className='active'><span>#</span>home</li>
                        <li><span>#</span>horks</li>
                        <li><span>#</span>about-me</li>
                        <li><span>#</span>contact</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
export default Navbar;