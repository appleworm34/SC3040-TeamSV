import Navbar from "./Navbar";
import Footer from "./Footer"
import {Outlet} from "react-router-dom";

export default function Layout(){
    return (
        <div className=" flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1" style={{marginTop: '75px'}}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}