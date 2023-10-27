import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import { Divider } from '@mui/material';
import CourseIndex from './CourseIndex';

const CourseIndexes = ({ 
    eventListKey, 
    eventLists, 
    showEventList, 
    toggleEventList, 
    handleEventHover, 
    handleEventLeave, 
    handleEventClick, 
    handleRemoveCourse,
    active,
    setActive,
    listIndex
}) => {
    // console.log(active)
    return (
        <div key={eventListKey}>
            <div className='flex justify-between mt-4'>
                <div className="flex items-center">
                <button className="remove-button" onClick={() => handleRemoveCourse(eventListKey)}>
                        <RemoveIcon fontSize="small" />
                    </button>
                    <h2 className="mt-1">{eventListKey}</h2>
                </div>
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
                <div className='flex flex-wrap'>
                    {eventLists[eventListKey].map((element, index) => (
                        <CourseIndex 
                            eventListKey={eventListKey}
                            eventLists={eventLists}
                            handleEventHover={handleEventHover}
                            handleEventLeave={handleEventLeave}
                            handleEventClick={handleEventClick}
                            element={element}
                            index={index}
                            active={active}
                            setActive={setActive}
                            listIndex={listIndex}
                            indexNo={element? element[0].indexNo : null}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseIndexes;
