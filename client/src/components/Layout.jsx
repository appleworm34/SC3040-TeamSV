import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar className="navbar" />
            <div className="main-content" sx={{ marginTop: "64px" }}>
                <Outlet className="main-content" />
            </div>
            <Footer className="footer" />
        </div>
    );
}
