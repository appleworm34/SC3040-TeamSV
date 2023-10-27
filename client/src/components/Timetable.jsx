import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import CourseIndex from './CourseIndexes'
import CourseIndexList from './CourseIndexList';
import generateTimetable from './TimetableGenerator';
import { Select, MenuItem, Button, Divider, Alert, Snackbar, Dialog } from '@mui/material';
import AddCourseModal from './AddCourseModal';
import TimetableConstraintsForm from './TimetableConstraintsForm';
import { useSelector } from 'react-redux';
import PlanSelector from './PlanSelector';

const localizer = momentLocalizer(moment);
const minTime = moment().set({ hour: 8, minute: 0, second: 0 });
const maxTime = moment().set({ hour: 23, minute: 0, second: 0 });


const addStartDateAndEndDateToLessons = (course) => {
  if(!course) return null;
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
      lesson['courseId'] = course._id
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
    <div className='text-xs'>
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
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentHoveredEvents, setCurrentHoveredEvents] = useState([]);  
  const [showEventList, setShowEventList] = useState({});
  const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [generatedTimetableOptions, setGeneratedTimetableOptions] = useState([]);
  const [selectedGeneratedPlanIndex, setSelectedGeneratedPlanIndex] = useState(-1)
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(-1)
  const [selectedBlockedDays, setSelectedBlockedDays] = useState([]);
  const [selectedEarliestStartTime, setSelectedEarliestStartTime] = useState("");
  const [selectedLatestEndTime, setSelectedLatestEndTime] = useState("");
  const [showGenerateOptions, setShowGenerateOptions] = useState(false);
  const [plans, setPlans] = useState([[], [], [], [], []]);
  const [active, setActive] = useState([]); 
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [failedReasons, setFailedReasons] = useState([])

  const {_id} = useSelector((state) => state.user) || "";

  const getUserPlans = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${_id}/plans`,
      {
        method: "GET"
      }
    )

    const data = await response.json()
    return data
  }

  // Function to show lesson timings when hovering over a certain index
  const handleEventHover = (events) => {
    // Clear the previously hovered events
    setCurrentHoveredEvents(events);
    // Add the events from the currently hovered element to selectedEvents
    setSelectedEvents((prevSelectedEvents) => (
      [...prevSelectedEvents, ...events]
    ));
    // console.log(selectedEvents)
  };

  // Function to remove the lesson timings when leaving hover
  const handleEventLeave = () => {
    // Remove the previously hovered events from selectedEvents
    setSelectedEvents((prevSelectedEvents) => {
      return prevSelectedEvents.filter(
        (event) => !currentHoveredEvents.includes(event)
      );
    });
    // console.log(selectedEvents)
    // Clear the current hovered events
    setCurrentHoveredEvents([]);
  };

  // Function to add and retain the lesson timings on timetable from certain index
  const handleEventClick = (events) => {
    console.log(selectedEvents)
    setSelectedEvents((prevSelectedEvents) => {
      // Create a Set of _id values from the events to be removed
      const eventsToRemove = new Set(events.map(event => event.indexNo));

      // Filter out the events with matching _id
      const updatedSelectedEvents = prevSelectedEvents.filter(selectedEvent => !eventsToRemove.has(selectedEvent.indexNo));

      // Add the events that don't exist in selectedEvents
      const updatedEvents = [
          ...updatedSelectedEvents,
          ...events.filter(event => !eventsToRemove.has(event.indexNo))
      ];

      return updatedEvents;
  });
  };

  // Toggle showing all indexes of course
  const toggleEventList = (eventListKey) => {
    setShowEventList((prevShowEventList) => ({
      ...prevShowEventList,
      [eventListKey]: !prevShowEventList[eventListKey],
    }));
  };
  
  // Function to open the popup to view course info and add courses
  const openPopup = () => {
    setAddCourseModalOpen(true);
  };

  // Function to close the popup to view course info and add courses
  const closePopup = () => {
    setAddCourseModalOpen(false);
  };

  // Function to format the generated timetable schedule so it can be displayed on timetable
  const formatGeneratedTimeTable = (lessonsList) => {
    let generatedList = [];
    for (const idx in lessonsList) {
      for (const idx1 in lessonsList[idx].lessons)
        generatedList.push(lessonsList[idx].lessons[idx1]);
    }
    setSelectedEvents(generatedList);
    // console.log(selectedEvents);
  };

  // Function to change the lessons on timetable according to the selected generated plan
  const handleGeneratedPlanChange = (event) => {
    setSelectedGeneratedPlanIndex(event.target.value);
  };

  // Function to add blocked days constraint for generation of timetable
  const handleBlockedDaysChange = (event) => {
    setSelectedBlockedDays(event.target.value);
  };

  // Function to add earliest start time constraint for generation of timetable
  const handleEarliestStartTimeChange = (event) => {
    setSelectedEarliestStartTime(event.target.value);
  };

  // Function to add latest end time constraint for generation of timetable
  const handleLatestEndTimeChange = (event) => {
    setSelectedLatestEndTime(event.target.value);
  };

  // Function to remove course from added courses
  const handleRemoveCourse = (courseCode) => {
    //console.log(courseCode[0]); // course code of the course to be removed
    // const patchModulesAdded = async (courseId) => {
    //   const response = await fetch(
    //     `http://localhost:3001/user/add/${_id}/${courseId}`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await response.json();
    // };
    // filter the courseList to remove the course with the specified course code
    if (courseList) {
      const courseToUpdate = courseList.filter((course) => course.courseCode === courseCode[0]);
      // console.log(courseToUpdate[0]);
      const courseId = courseToUpdate[0]._id;
      const updatedCourseList = courseList.filter((course) => course.courseCode !== courseCode[0]);
      setCourseList(updatedCourseList);
      // patchModulesAdded(courseId);
    }

  };

  // Function to save the current selected indexes to a plan
  const saveCurrentPlan = (planIndex) => {
    const updatePlans = async (newPlan) => {
      const response = await fetch(
        `http://localhost:3001/user/${_id}/update_plans`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPlan })
        }
      );
      const data = await response.json();
    };

    if (selectedEvents.length > 0 && planIndex< 5) {
      const newPlan = [...selectedEvents];
      let updatedPlans = plans;
      updatedPlans[planIndex] = newPlan;
      setPlans(updatedPlans);
      updatePlans(updatedPlans);
      handleOpenSnackbar(`Plan ${planIndex+1} saved.`, "success");
      // console.log(updatedPlans)
    }
  };

  const deleteCurrentPlan = (planIndex) => {
    const updatePlans = async (newPlan) => {
      const response = await fetch(
        `http://localhost:3001/user/${_id}/update_plans`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPlan })
        }
      );
      const data = await response.json();
    };

    if (planIndex< 5) {
      const newPlan = [];
      let updatedPlans = plans;
      updatedPlans[planIndex] = newPlan;
      setPlans(updatedPlans);
      updatePlans(updatedPlans);
      setSelectedEvents([...plans[planIndex]]);
      setCourseList([]);
      handleOpenSnackbar(`Plan ${planIndex+1} deleted.`, "success");
    }
  };

  // Function to handle plan selection from the dropdown
  const handlePlanSelect = (planIndex) => {
    if (planIndex === -1) {
      setSelectedEvents([]);
      handleOpenSnackbar('No Plan selected.', "info");
    }
    if (planIndex >= 0 && planIndex < plans.length) {
      if (plans[planIndex].length > 0) {
        setSelectedEvents([...plans[planIndex]]);
        handleOpenSnackbar(`Plan ${planIndex+1} loaded.`, "success");
        const uniqueIndexNo = new Set(plans[planIndex].map((lesson) => lesson.indexNo));
        const uniqueIndexNoArray = Array.from(uniqueIndexNo);
        setActive(uniqueIndexNoArray);
      }
      else {
        handleOpenSnackbar(`Plan empty.`, "info");
      }
    } 
    setSelectedPlanIndex(planIndex);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleGenerateTimetable = () => {
      const [options, failedReasons] = generateTimetable(courseList, selectedBlockedDays, selectedEarliestStartTime, selectedLatestEndTime)
      if (courseList.length === 0) setFailedReasons(["No courses selected."]);
      else setFailedReasons(failedReasons);

      if (options.length !== 0) {
        setGeneratedTimetableOptions(options);
        handleOpenSnackbar(`Successfully generated ${options.length} plans.`, "success");
      }
      else {
        handleOpenSnackbar(`Not able to generate plans.`, "warning");
      }
  };

  const handleViewMoreClick = () => {
    setDialogOpen(true);
    handleCloseSnackbar(); // Close the Snackbar when you open the dialog
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    function convertToDates(arr) {
      return arr.map((item) => {
        if (item.start && item.end) {
          return {
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
          };
        }
        return item;
      });
    }
    getUserPlans().then((data) => {
      const updatedData = data.map((arr) => convertToDates(arr));
      // console.log(updatedData);
      setPlans(updatedData)
    })
  }, []);
  
  useEffect(() => {    
    if(selectedGeneratedPlanIndex !== -1)
      formatGeneratedTimeTable(generatedTimetableOptions[selectedGeneratedPlanIndex]);
  }, [selectedGeneratedPlanIndex, generatedTimetableOptions]);

  useEffect(() => {
    // This code will run whenever courseList changes
    formattedCourseList = formatCourseList(courseList);
    setEventLists(formattedCourseList);
  }, [courseList]);

  useEffect(() => {
    // console.log(plans[selectedPlanIndex])
     // To update the courseList according to courses in plan
     if (selectedPlanIndex !== -1 && plans[selectedPlanIndex].length > 0)
     {
      // console.log("hi")
      const tempPlan = plans[selectedPlanIndex];
      const uniqueCourseIds = new Set();
  
      tempPlan.forEach((item) => uniqueCourseIds.add(item.courseId));
  
      const uniqueCourseIdArray = [...uniqueCourseIds];
      // console.log(uniqueCourseIdArray)
      if (uniqueCourseIdArray.length === 0) return;

      const getCourseInfo = async (courseId) => {
        const response = await fetch(
          `http://localhost:3001/course/${courseId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        return data;
      };
  
      const fetchCourseInfo = async () => {
        const courseInfoArray = [];
        for (const courseId of uniqueCourseIdArray) {
          try {
            const courseInfoPromises = uniqueCourseIdArray.map(courseId => getCourseInfo(courseId));
            const courseInfoArray = await Promise.all(courseInfoPromises);
            return courseInfoArray;
          } catch (error) {
            console.error(`Failed to fetch course info for courseId ${courseId}.`, error);
            return [];
          }
        }
      };
      
      fetchCourseInfo().then((data) => {
        if (data)
          setCourseList(data)
        else 
          setCourseList([])
      });
    }
  }, [selectedPlanIndex])

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
            <PlanSelector 
              plans={plans} 
              savePlan={saveCurrentPlan} 
              deletePlan={deleteCurrentPlan}
              handleSelectPlan={handlePlanSelect} 
              selectedPlanIndex={selectedPlanIndex}
            />
            <Snackbar
              open={snackbar.open}
              autoHideDuration={1000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              onClose={handleCloseSnackbar}
            >
              <Alert
                sx={{ width: "100%", fontSize: "1.1rem" }}
                elevation={6}
                variant="filled"
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
                action={
                  snackbar.severity === 'warning' ? (
                  <Button color="inherit" size="small" onClick={handleViewMoreClick}>
                    View More
                  </Button> ) : null
                }
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <div className='m-4'>
                {
                  failedReasons.map((reason) => (
                    <div>{reason}</div>
                  ))
                }
              </div>
            </Dialog>
            {
              <div className='mt-4'>
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
                    active={active}
                    setActive={setActive}
                  />
                </div>
                <Divider />
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
                        <Button sx={{marginTop: "20px" }} onClick={() => handleGenerateTimetable()}
                        >Generate</Button>
                      </div>
                    </div>
                  ) : null
                }
                {generatedTimetableOptions.length > 1 ? 
                (
                  <div className='ml-2 mt-5'>
                    <div>Generated Timetables:</div>
                    <Select
                      value={selectedGeneratedPlanIndex}
                      onChange={handleGeneratedPlanChange}
                      sx={{ marginTop: '20px' }}
                    >
                      <MenuItem value={-1}>None</MenuItem> 
                      {generatedTimetableOptions.map((option, index) => (
                        <MenuItem key={index} value={index}>
                          Generated Plan {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                    {
                      selectedGeneratedPlanIndex > -1 ? 
                        (
                          <div>
                            <div className='mt-5 mb-2'>Plan details:</div>
                            {generatedTimetableOptions[selectedGeneratedPlanIndex].map((course) => (
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
