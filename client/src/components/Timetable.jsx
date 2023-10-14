import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import CourseIndex from './CourseIndex';
import CourseIndexList from './CourseIndexList';

const localizer = momentLocalizer(moment);
const minTime = moment().set({ hour: 7, minute: 0, second: 0 });
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
      if (index.indexNo)
        lesson['indexNo'] = index.indexNo
      lesson['start'] = startDate
      lesson['end'] = endDate
      delete index.indexNo
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

const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.indexNo}</strong>
      <p>{event.group}</p>
    </div>
);

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
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showEventList, setShowEventList] = useState({});

  const handleEventHover = (event) => {
    setSelectedEvents(event);
    // console.log(selectedEvents)
  };
  
  const toggleEventList = (eventListKey) => {
    setShowEventList((prevShowEventList) => ({
      ...prevShowEventList,
      [eventListKey]: !prevShowEventList[eventListKey],
    }));
  };
    
  return (
    <div className="flex">
      <div className="w-2/3 p-4">
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
        <div className="w-1/3 p-4">
          {
            <CourseIndexList
              eventLists={eventLists}
              showEventList={showEventList}
              toggleEventList={toggleEventList}
              handleEventHover={handleEventHover}
            />
          }
        </div>
    </div>
    );
}

export default Timetable;
