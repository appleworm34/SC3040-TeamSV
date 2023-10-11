import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";

// For swapping of modules
function ForumPage() {
    return (
        <div className="page">
            <DropdownModuleSearchBox />
            <section>
                <div className="mod_information">
                    <div className="course_code">
                        <h1> Course code </h1>
                    </div>
                    <div className="current_index">
                        <h1> Current Index </h1>
                    </div>
                    <div className="desired_index">
                        <h1> Desired Index </h1>
                    </div>
                    <div className="status">
                        <h1> Status </h1>
                    </div>
                </div>
            </section>
            <h2 className="temp">FORUM PAGE - MOD SWAP, BALLOT, POINTS ETC</h2>
        </div>
        
      );
}

export default ForumPage;
