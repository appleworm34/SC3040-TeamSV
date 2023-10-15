import React from 'react';
import CourseIndex from './CourseIndex'; 

const CourseIndexList= ({ eventLists, showEventList, toggleEventList, handleEventHover, handleEventLeave }) => {
    // console.log(eventLists)
  return (
    <div>
      {Object.keys(eventLists).map((eventListKey) => (
        <CourseIndex
          key={eventListKey}
          eventListKey={Object.keys(eventLists[eventListKey])}
          eventLists={eventLists[eventListKey]}
          showEventList={showEventList}
          toggleEventList={toggleEventList}
          handleEventHover={handleEventHover}
          handleEventLeave={handleEventLeave}
        />
      ))}
    </div>
  );
};

export default CourseIndexList;
