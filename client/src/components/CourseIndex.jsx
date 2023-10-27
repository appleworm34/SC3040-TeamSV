import React, { useState } from 'react';

const CourseIndex = ({
  eventListKey,
  eventLists,
  handleEventHover,
  handleEventLeave,
  handleEventClick,
  element,
  index,
  active,
  setActive,
  listIndex,
  indexNo
}) => {
  const [isClicked, setIsClicked] = useState(active[listIndex] === indexNo);

  // console.log(active)
  const handleElementClick = () => {
    setIsClicked(!isClicked);

    if (isClicked) {
      setActive((prevActive) => {
        const temp = [...prevActive];
        temp[listIndex] = -1;
        return temp;
      });
    } else {
      setActive((prevActive) => {
        const temp = [...prevActive];
        temp[listIndex] = indexNo;
        return temp;
      });
    }

    // let temp = active;
    // // console.log(index)
    // if (active[listIndex] === -1) {
    //   temp[listIndex] = index;
    // }
    // else {
    //   temp[listIndex] = -1;
    // } 
    // setActive(temp);
    // console.log(active)

    if(isClicked)
      handleEventClick(eventLists[eventListKey][index]);
  }

  return (
    <div>
      <div
        onMouseEnter={() => {
          if(!isClicked)
            handleEventHover(element)
        }}
        onMouseLeave={() => {
          if(!isClicked)
            handleEventLeave()
        }}
        onClick={() => {
          if(active[listIndex] === -1 || active[listIndex] === indexNo)
            handleElementClick(index)
        }}
        className={`cursor-pointer p-2 mt-1 mb-1 mr-2 rounded border-4 ${isClicked ? 'bg-emerald-300 border-emerald-300' : ''}`}
      >
      {eventLists[eventListKey][index][0].indexNo}
      </div>
    </div>
  )
}

export default CourseIndex;