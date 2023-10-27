export default function generateTimetable(courses, blockedDays, earliestStartTime, latestEndTime) {
    // const courses = [
    //     {
    //         "courseCode": "CC0001",
    //         "courseName": "INQUIRY & COMMUNICATION IN AN INTERDISCIPLINARY WORLD",
    //         "courseNumOfAU": "2.0 AU",
    //         "indexes":
    //             [{
    //                 "indexNo": "82202",
    //                 "lessons": [{
    //                     "type": "TUT", "group": "T001", "day": "MON", "time": "0830-1020", "venue": "LHN-TR+22", "remarks": "Teaching Wk2-13", "startTime": "0830", "endTime": "1020"
    //                 }]
    //             },
    //             {
    //                 "indexNo": "82206",
    //                 "lessons": [{
    //                     "type": "TUT", "group": "T001", "day": "MON", "time": "0830-1020", "venue": "LHN-TR+22", "remarks": "Teaching Wk2-13", "startTime": "0830", "endTime": "1020"
    //                 }]
    //             },
    //             {
    //                 "indexNo": "82209",
    //                 "lessons": [{
    //                     "type": "TUT", "group": "T002", "day": "MON", "time": "0830-1020", "venue": "LHN-TR+23", "remarks": "Teaching Wk2-13", "startTime": "0830", "endTime": "1020"
    //                 }]
    //             }
    //             ]
    //     },
    //     {
    //         "courseCode": "MH1810",
    //         "courseName": "MATHEMATICS 1",
    //         "courseNumOfAU": "3.0 AU",
    //         "indexes": [{
    //             "indexNo": "10086",
    //             "lessons": [{ "type": "LEC/STUDIO", "group": "LE2", "day": "FRI", "time": "0830-1020", "venue": "LKC-LT", "remarks": "", "startTime": "0830", "endTime": "1020" }, { "type": "TUT", "group": "CSA", "day": "TUE", "time": "1030-1320", "venue": "TR+18", "remarks": "Teaching Wk2-13", "startTime": "1030", "endTime": "1320" }]
    //         },
    //         {
    //             "indexNo": "10087",
    //             "lessons": [{ "type": "LEC/STUDIO", "group": "LE2", "day": "FRI", "time": "0830-1020", "venue": "LKC-LT", "remarks": "", "startTime": "0830", "endTime": "1020" }, { "type": "TUT", "group": "CSB", "day": "TUE", "time": "1130-1220", "venue": "TR+15", "remarks": "Teaching Wk2-4", "startTime": "1130", "endTime": "1220" }]
    //         }]
    //     },
    //     {
    //         "courseCode": "SP0061",
    //         "courseName": "SCIENCE & TECHNOLOGY FOR HUMANITY",
    //         "courseNumOfAU": "3.0 AU",
    //         "indexes":
    //             [{
    //                 "indexNo": "22127",
    //                 "lessons":
    //                     [{
    //                         "type": "SEM",
    //                         "group": "S1",
    //                         "day": "WED",
    //                         "time": "1430-1620",
    //                         "venue": "LHS-TR+36",
    //                         "remarks": "", "startTime": "1430", "endTime": "1620"
    //                     }]
    //             },
    //             {
    //                 "indexNo": "22128",
    //                 "lessons":
    //                     [{
    //                         "type": "SEM",
    //                         "group": "S2",
    //                         "day": "WED",
    //                         "time": "1730-1920",
    //                         "venue": "LHS-TR+35",
    //                         "remarks": "", "startTime": "1730", "endTime": "1920"
    //                     }]
    //             }]
    //     }
    // ]
    // console.log(courses)
    for (const e in courses) {
        courses[e].indexes.forEach((index) => {
            index.lessons.forEach((lesson) => {
                // Parse day and time information
                let timing = lesson.time
                let [startTime, endTime] = timing.split("-")
                lesson["startTime"] = startTime
                lesson["endTime"] = endTime
            });
        });
        console.log(courses[e])
    }
    
    // Set default values
    if (earliestStartTime === '') earliestStartTime = "0600";
    if (latestEndTime === '') latestEndTime = "2200";

    function findValidIndexCombinations(courseIndex, currentCombination, blockedDays, earliestStartTime, latestEndTime, failedReasons) {
        if (courseIndex === courses.length) {
            // All courses have been considered, so return a clone of the current combination
            return [Object.assign([], currentCombination)];
        }

        const course = courses[courseIndex];
        const validCombinations = [];

        for (const index of course.indexes) {
            // Check if this index clashes with any index in the current combination
            if (!currentCombination.some((selectedIndex) => clashes(selectedIndex, index)) &&
                isWithinTimeConstraints(index.lessons, blockedDays, earliestStartTime, latestEndTime, failedReasons)) {
                // Add the index to the current combination
                currentCombination.push({
                    courseCode: course.courseCode,
                    courseName: course.courseName,
                    courseNumOfAU: course.courseNumOfAU,
                    indexNo: index.indexNo,
                    lessons: index.lessons,
                });

                // Recursively find combinations for the next course
                const combinations = findValidIndexCombinations(courseIndex + 1, currentCombination, blockedDays, earliestStartTime, latestEndTime, failedReasons);

                // Add the valid combinations to the result
                validCombinations.push(...combinations);

                // Remove the index for backtracking
                currentCombination.pop();
            } else {
                // Record the failed reason
                const reason = getFailedReason(course.courseCode, index.indexNo, index, blockedDays, earliestStartTime, latestEndTime);
                if (!failedReasons.includes(reason)) {
                    failedReasons.push(reason);
                }
            }
        }

        return validCombinations;
    }

    function clashes(index1, index2) {
        for (const lesson1 of index1.lessons) {
            for (const lesson2 of index2.lessons) {
                if (lesson1.day === lesson2.day &&
                    (lesson1.startTime < lesson2.endTime && lesson1.endTime > lesson2.startTime)) {
                    return true; // Clash found
                }
            }
        }
        return false; // No clash found
    }

    function isWithinTimeConstraints(lessons, blockedDays, earliestStartTime, latestEndTime, failedReasons) {
        for (const lesson of lessons) {
            if (blockedDays.includes(lesson.day)) {
                return false;
            }
            if (lesson.startTime < earliestStartTime || lesson.endTime > latestEndTime) {
                return false;
            }
        }
        return true;
    }

    function getFailedReason(courseCode, indexNo, index, blockedDays, earliestStartTime, latestEndTime) {
        if (index.lessons.some((lesson) => blockedDays.includes(lesson.day))) {
            return `Course ${courseCode}, Index ${indexNo}: Lesson on a blocked day`;
        } else if (index.lessons.some((lesson) => lesson.startTime < earliestStartTime || lesson.endTime > latestEndTime)) {
            return `Course ${courseCode}, Index ${indexNo}: Lesson outside time constraints`;
        } else {
            return `Course ${courseCode}, Index ${indexNo}: Clashes with other courses`;
        }
    }

    // Define the constraints
    // const blockedDays = ["THU"];
    // const earliestStartTime = "0700";
    // const latestEndTime = "1800";
    const failedReasons = [];

    const validIndexCombinations = findValidIndexCombinations(0, [], blockedDays, earliestStartTime, latestEndTime, failedReasons);

    if (validIndexCombinations.length === 0) {
        if (failedReasons.length > 0) {
            console.log("No valid combinations due to the following reasons:");
            for (const reason of failedReasons) {
                console.log(reason);
            }
            return [[], failedReasons];
        } else {
            console.log("No valid combinations due to time constraints or blocked days.");
            return [[], failedReasons];
        }
    } else {
        console.log(validIndexCombinations);
        if (validIndexCombinations[0].length === 0) return [[], failedReasons];
        else return [validIndexCombinations, failedReasons];
    }
}
