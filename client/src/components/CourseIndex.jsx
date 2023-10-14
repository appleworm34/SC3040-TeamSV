import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CourseIndex = ({ eventListKey, eventLists, showEventList, toggleEventList, handleEventHover }) => {
    // console.log(eventListKey)
    return (
        <div key={eventListKey}>
        <div className="flex items-center">
            <h2 className="mr-5 mt-1">{eventListKey}</h2>
            <button onClick={() => toggleEventList(eventListKey)}>
            {showEventList[eventListKey] ? (
                <RemoveIcon fontSize="small" />
            ) : (
                <AddIcon fontSize="small" />
            )}
            </button>
        </div>
        {showEventList[eventListKey] && (
            <div>
            {eventLists[eventListKey].map((element, index) => (
                <div
                onMouseEnter={() => handleEventHover(element)}
                onMouseLeave={() => handleEventHover([])}
                className="cursor-pointer p-2"
                >
                {eventLists[eventListKey][index][0].indexNo}
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default CourseIndex;
