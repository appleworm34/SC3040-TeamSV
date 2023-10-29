import React from 'react';
import { Select, MenuItem, Button, Divider } from '@mui/material';

function PlanDetails({ selectedEvents }) {
  // console.log(selectedEvents)

  const uniqueCourses = {};

  // Iterate through the data array
  selectedEvents.forEach(item => {
    const { courseId, courseCode, indexNo } = item;
    
    // Check if the courseId is not already in the uniqueCourses object
    if (!uniqueCourses[courseId]) {
      uniqueCourses[courseId] = [courseCode, indexNo];
    }
  });

  // Convert the uniqueCourses object to an array of objects
  const uniqueCoursesArray = Object.entries(uniqueCourses).map(([courseId, [courseCode, indexNo]]) => ({
    courseId: courseId,
    courseCode: courseCode,
    index: indexNo,
  }));

  return (
    <div>
      {
        uniqueCoursesArray.map((courseInfo) => (
          <div>{courseInfo.courseCode} {courseInfo.index}</div>
        ))
      }
    </div>
  );
}

export default PlanDetails;
