import { Outlet } from "react-router-dom";
import Decoration from "../decoration/Decoration";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = (props: any) => {
    return (
        <div id="wrap" className="flex justify-center w-[1366px] relative flex-wrap bg-[url('./resources/background.png')]">
            <Decoration />
            <Navbar />
            <div className=" w-[100%] lg:w-[1024px] mt-[128px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
export default Layout;
