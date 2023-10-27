import React, { useState } from 'react';
import CourseIndexes from './CourseIndexes'; 

const CourseIndexList= ({ 
  eventLists, 
  showEventList, 
  toggleEventList, 
  handleEventHover, 
  handleEventLeave, 
  handleEventClick, 
  handleRemoveCourse,
  active,
  setActive 
}) => {
  // console.log(eventLists)
  if(eventLists.length > 0 && active.length === 0) {
    let activeList = Object.keys(eventLists).map(() => -1);
    setActive(activeList);
  } else if (eventLists.length > active.length) {
    let activeList = active;
    while(eventLists.length > active.length) {
      activeList.push(-1);
    }
    setActive(activeList);
  }

  return (
    <div>
      {Object.keys(eventLists).map((eventListKey, index) => (
        <CourseIndexes
          key={eventListKey}
          eventListKey={Object.keys(eventLists[eventListKey])}
          eventLists={eventLists[eventListKey]}
          showEventList={showEventList}
          toggleEventList={toggleEventList}
          handleEventHover={handleEventHover}
          handleEventLeave={handleEventLeave}
          handleEventClick={handleEventClick}
          handleRemoveCourse={handleRemoveCourse}
          active={active}
          setActive={setActive}
          listIndex={index}
        />
      ))}
    </div>
  );
};

export default CourseIndexList;
