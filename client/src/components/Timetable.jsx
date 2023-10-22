import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import CourseIndex from './CourseIndex'
import CourseIndexList from './CourseIndexList';
import generateTimetable from './TimetableGenerator';
import { Select, MenuItem, Button } from '@mui/material';
import AddCourseModal from './AddCourseModal';
import TimetableConstraintsForm from './TimetableConstraintsForm';

const localizer = momentLocalizer(moment);
const minTime = moment().set({ hour: 8, minute: 0, second: 0 });
const maxTime = moment().set({ hour: 23, minute: 0, second: 0 });


const addStartDateAndEndDateToLessons = (course) => {
  // console.log(course)
  const today = new Date()
  const todayDay = today.getDate()
  const dayOfWeek = {"SUN": 0, "MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6}

  // Process each index and its lessons
  course.indexes.forEach((index) => {
    index.lessons.forEach((lesson) => {
      // Parse day and time information
      let timing = lesson.time
      let [startTime, endTime] = timing.split("-")
      let startHour = startTime.substring(0, 2)
      let startMin = startTime.substring(2)
      let endHour = endTime.substring(0, 2)
      let endMin = endTime.substring(2)
      let day = dayOfWeek[lesson.day]
      let diff = today.getDay() - day

      let startDate = new Date(2023, today.getMonth(), todayDay-diff, startHour, startMin)
      let endDate = new Date(2023, today.getMonth(), todayDay-diff, endHour, endMin)
      // console.log(startDate)
      // console.log(endDate)
      // console.log(index.indexNo)
      lesson['indexNo'] = index.indexNo
      lesson['courseCode'] = course.courseCode
      lesson['start'] = startDate
      lesson['end'] = endDate
      // delete index.indexNo
    });
  });

  return course;
}

const CustomToolbar = () => {
    return (
      <div className="flex justify-between bg-gray-200 p-2">
        <div className="hidden">
          {/* Hide the default navigation buttons */}
          <button>Back</button>
          <button>Today</button>
          <button>Next</button>
        </div>
      </div>
    );
};

const CustomHeader = ({ label }) => {
    return (
      <div>
        {label.split(' ')[1]}
      </div>
    );
};

const CustomEvent = ({ event }) => {
  return(
    <div>
      <strong>{event.courseCode}</strong>
      <p>{event.type}</p>
      <p>{event.group}</p>
    </div>
  )
};

function Timetable({ courseList, setCourseList }) {
  
  const formatIndexList = (course) => {
    const formattedLessons = {}
    const lessonList = []
    const courseCode = course.courseCode
    const courseIndex = course.indexes
    for (const lesson in courseIndex) {
      // console.log(courseIndex[lesson.toString()].lessons)
      lessonList.push(courseIndex[lesson.toString()].lessons)
    }
    formattedLessons[courseCode] = lessonList
    // console.log(formattedLessons)
    return formattedLessons
  }

  // console.log(course)
  const formatCourseList = () => {
    const formattedCourseList = []
    for(const e in courseList) {
      const courseWithDate = addStartDateAndEndDateToLessons(courseList[e]);
      // console.log(courseWithDate)
      const formattedLessons = formatIndexList(courseWithDate)
      formattedCourseList.push(formattedLessons)
      // console.log(formattedCourseList)
    }
    return formattedCourseList
  }

  let formattedCourseList = formatCourseList()
  // generateTimetable(courseList)

  const [eventLists, setEventLists] = useState(formattedCourseList);
  const [selectedEvents, setSelectedEvents] = useState([
    // this will be the modules with the indexes already added
    {
      type: 4,
      group: 'Workshop',
      start: new Date(2023, 9, 15, 9, 0),
      end: new Date(2023, 9, 15, 17, 0),
    }
  ]);
  const [currentHoveredEvents, setCurrentHoveredEvents] = useState([]);  
  const [showEventList, setShowEventList] = useState({});
  const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [generatedTimetableOptions, setGeneratedTimetableOptions] = useState([]);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(-1)
  const [selectedBlockedDays, setSelectedBlockedDays] = useState([]);
  const [selectedEarliestStartTime, setSelectedEarliestStartTime] = useState("");
  const [selectedLatestEndTime, setSelectedLatestEndTime] = useState("");
  const [showGenerateOptions, setShowGenerateOptions] = useState(false);

  const handleEventHover = (events) => {
    // Clear the previously hovered events
    setCurrentHoveredEvents(events);
    // Add the events from the currently hovered element to selectedEvents
    setSelectedEvents((prevSelectedEvents) => (
      [...prevSelectedEvents, ...events]
    ));
  };

  const handleEventLeave = () => {
    // Remove the previously hovered events from selectedEvents
    setSelectedEvents((prevSelectedEvents) => {
      return prevSelectedEvents.filter(
        (event) => !currentHoveredEvents.includes(event)
      );
    });
    // Clear the current hovered events
    setCurrentHoveredEvents([]);
  };

  const handleEventClick = (events) => {
    setSelectedEvents((prevSelectedEvents) => {
      // Check if the events are already selected
      const areEventsSelected = events.every((event) =>
        prevSelectedEvents.some(
          (selectedEvent) => selectedEvent.indexNo === event.indexNo || selectedEvent.courseCode === event.courseCode
        )
      );
  
      if (areEventsSelected) {
        // Deselect the events by filtering them out
        return prevSelectedEvents.filter((selectedEvent) => {
          // console.log(selectedEvent.courseCode)
          !events.some(
            (event) => selectedEvent.indexNo === event.indexNo || selectedEvent.courseCode === event.courseCode
          )
      });
      } else {
        // Select the events by adding them
        return [...prevSelectedEvents, ...events];
      }
    });

    console.log(selectedEvents)
  };

  const toggleEventList = (eventListKey) => {
    setShowEventList((prevShowEventList) => ({
      ...prevShowEventList,
      [eventListKey]: !prevShowEventList[eventListKey],
    }));
  };
  
  const openPopup = () => {
    setAddCourseModalOpen(true);
  };

  const closePopup = () => {
    setAddCourseModalOpen(false);
  };

  const formatGeneratedTimeTable = (lessonsList) => {
    let generatedList = [];
    for (const idx in lessonsList) {
      for (const idx1 in lessonsList[idx].lessons)
        generatedList.push(lessonsList[idx].lessons[idx1]);
    }
    setSelectedEvents(generatedList);
    // console.log(selectedEvents);
  };

  const handlePlanChange = (event) => {
    setSelectedPlanIndex(event.target.value);
  };

  const handleBlockedDaysChange = (event) => {
    setSelectedBlockedDays(event.target.value);
  };

  const handleEarliestStartTimeChange = (event) => {
    setSelectedEarliestStartTime(event.target.value);
  };

  const handleLatestEndTimeChange = (event) => {
    setSelectedLatestEndTime(event.target.value);
  };

  const handleRemoveCourse = (courseCode) => {
    //console.log(courseCode[0]); // course code of the course to be removed
  
    // filter the courseList to remove the course with the specified course code
    if (courseList) {
      const updatedCourseList = courseList.filter((course) => course.courseCode !== courseCode[0]);
      setCourseList(updatedCourseList);
    }
    
  };

  useEffect(() => {    
    formatGeneratedTimeTable(generatedTimetableOptions[selectedPlanIndex]);
  }, [selectedPlanIndex, generatedTimetableOptions]);

  useEffect(() => {
    // This code will run whenever courseList changes
    formattedCourseList = formatCourseList(courseList);
    setEventLists(formattedCourseList);
  }, [courseList]);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <Calendar
          // key={JSON.stringify(selectedEvents)} // Adding a key to force re-render
          localizer={localizer}
          events={selectedEvents}
          defaultView="week" // Set the default view to week
          views={['week']} // Specify that only the week view is available
          startAccessor="start"
          endAccessor="end"
          min={minTime} // Set the minimum time
          max={maxTime} // Set the maximum time
          components={{
              toolbar: CustomToolbar, // Use the custom toolbar
              header: CustomHeader,
              event: CustomEvent,
          }}
        />
        </div>
        <div className="w-1/4 p-4">
          <aside>
            {
              <div>
                <Button onClick={openPopup}>Add Courses</Button>
                <AddCourseModal 
                  isOpen={isAddCourseModalOpen} 
                  handleClose={closePopup} 
                  courseList={courseList}
                  setCourseList={setCourseList}
                />
                <div className="ml-2 mt-1">
                  <div>Added Courses:</div>
                  <CourseIndexList
                    eventLists={eventLists}
                    showEventList={showEventList}
                    toggleEventList={toggleEventList}
                    handleEventHover={handleEventHover}
                    handleEventLeave={handleEventLeave}
                    handleEventClick={handleEventClick}
                    handleRemoveCourse={handleRemoveCourse}
                  />
                </div>
                <Button sx={{ marginTop: "20px"}} onClick={() => setShowGenerateOptions(!showGenerateOptions)}>Generate Timetables</Button>
                {
                  showGenerateOptions ? (
                    <div className="flex flex-col">
                      <TimetableConstraintsForm
                        selectedBlockedDays={selectedBlockedDays}
                        selectedEarliestStartTime={selectedEarliestStartTime}
                        selectedLatestEndTime={selectedLatestEndTime}
                        handleBlockedDaysChange={handleBlockedDaysChange}
                        handleEarliestStartTimeChange={handleEarliestStartTimeChange}
                        handleLatestEndTimeChange={handleLatestEndTimeChange}
                      />
                      <div className="self-end mr-5">
                        <Button sx={{marginTop: "20px" }} onClick={() => setGeneratedTimetableOptions(generateTimetable(courseList, selectedBlockedDays, selectedEarliestStartTime, selectedLatestEndTime))}>Generate</Button>
                      </div>
                    </div>
                  ) : null
                }
                {generatedTimetableOptions.length > 1 ? 
                (
                  <div className='ml-2 mt-5'>
                    <div>Generated Timetables:</div>
                    <Select
                      value={selectedPlanIndex}
                      onChange={handlePlanChange}
                      sx={{ marginTop: '20px' }}
                    >
                      <MenuItem value={-1}>None</MenuItem> 
                      {generatedTimetableOptions.map((option, index) => (
                        <MenuItem key={index} value={index}>
                          Plan {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                    {
                      selectedPlanIndex > -1 ? 
                        (
                          <div>
                            <div className='mt-5 mb-2'>Plan details:</div>
                            {generatedTimetableOptions[selectedPlanIndex].map((course) => (
                            <div className='flex'>
                              <div className='mr-4'>{course.courseCode}</div>
                              <div>{course.indexNo}</div>
                            </div>
                            ))}
                          </div>
                        ) 
                        : null
                    }
                  </div>
                ) 
                : null}
              </div>
            }
          </aside>
        </div>
    </div>
    );
}

export default Timetable;
