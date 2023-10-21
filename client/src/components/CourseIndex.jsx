import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import { Divider } from '@mui/material';

const CourseIndex = ({ eventListKey, eventLists, showEventList, toggleEventList, handleEventHover, handleEventLeave, handleEventClick }) => {
    const [clickedStates, setClickedStates] = useState(eventLists[eventListKey].map(() => false));

    const handleElementClick = (index) => {
        setClickedStates((prevClickedStates) => {
            const newClickedStates = [...prevClickedStates];
            newClickedStates[index] = !newClickedStates[index];
            return newClickedStates;
        });

        // Handle event click
        if(clickedStates[index]) {
            handleEventClick(eventLists[eventListKey][index]);
        }
    };

    return (
        <div key={eventListKey}>
            <div className='flex justify-between mt-4'>
                <h2 className="mt-1">{eventListKey}</h2>
                <button onClick={() => toggleEventList(eventListKey)}>
                {showEventList[eventListKey] ? (
                    <ExpandLessIcon fontSize="small" />
                ) : (
                    <ListAltIcon fontSize="small" />
                )}
                </button>
            </div>
            <Divider />
            {showEventList[eventListKey] && (
                <div>
                {eventLists[eventListKey].map((element, index) => (
                    <div>
                        {/* <Divider /> */}
                        <div
                            onMouseEnter={() => {
                                if(!clickedStates[index])
                                    handleEventHover(element)
                            }}
                            onMouseLeave={() => {
                                if(!clickedStates[index])
                                    handleEventLeave()
                            }}
                            onClick={() => {
                                handleElementClick(index)
                            }}
                            className={`cursor-pointer p-2 ${clickedStates[index] ? 'clicked' : ''}`}
                        >
                        {eventLists[eventListKey][index][0].indexNo}
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default CourseIndex;
