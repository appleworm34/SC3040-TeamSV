import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar className="navbar" />
            <Outlet className="main-content" />
            <Footer className="footer" />
        </div>
    );
}
