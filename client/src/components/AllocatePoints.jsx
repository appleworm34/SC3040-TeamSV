import React from "react";
import { useState, useEffect } from "react";

function AllocatePoints(){
    const min = 1;
    const max = 100;

    const [value, setValue] = useState()

    // const handleChange = event => {
    //     const value = Math.max(min, Math.min(max, Number(event.target.value)));
    //     setValue(value); 
    // };

    return(
        <div className="allocate-points-box">
            <input
            className="search-box"
            type="number"
            placeholder="Allocate Points..."
            // onChange={handleChange}
            value={value}
            moz-appearance
            />

        </div>
    )


}

export default AllocatePoints; 