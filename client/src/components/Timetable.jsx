import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import CourseIndexList from './CourseIndexList';

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
      <strong>{event.type}</strong>
      <p>{event.group}</p>
    </div>
  )
};

function Timetable({ courseList }) {
  
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
  const formattedCourseList = []

  for(const e in courseList) {
    const courseWithDate = addStartDateAndEndDateToLessons(courseList[e]);
    // console.log(courseWithDate)
    const formattedLessons = formatIndexList(courseWithDate)
    formattedCourseList.push(formattedLessons)
    // console.log(formattedCourseList)
  }

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
        prevSelectedEvents.some((selectedEvent) => selectedEvent.indexNo === event.indexNo)
      );
  
      if (areEventsSelected) {
        // Deselect the events by filtering them out
        return prevSelectedEvents.filter((selectedEvent) =>
          events.every((event) => selectedEvent.indexNo !== event.indexNo)
        );
      } else {
        // Select the events by adding them
        return [...prevSelectedEvents, ...events];
      }
    });
  };

  const toggleEventList = (eventListKey) => {
    setShowEventList((prevShowEventList) => ({
      ...prevShowEventList,
      [eventListKey]: !prevShowEventList[eventListKey],
    }));
  };
    
  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <Calendar
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
          <aside className="sticky top-20">
            {
              <CourseIndexList
                eventLists={eventLists}
                showEventList={showEventList}
                toggleEventList={toggleEventList}
                handleEventHover={handleEventHover}
                handleEventLeave={handleEventLeave}
                handleEventClick={handleEventClick}
              />
            }
          </aside>
        </div>
    </div>
    );
}

export default Timetable;
