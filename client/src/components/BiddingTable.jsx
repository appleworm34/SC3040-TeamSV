import React, { useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    ButtonGroup,
    Typography,
} from "@mui/material";

function BiddingTable({ bdeList, setBdeList, resultsList, setResultsList }) {
    const [pointList, setPointList] = useState([]);

    function getPoints(courseCode) {
        const courseIndexInPointList = pointList.findIndex(
            (element) => element.courseCode === courseCode
        );
        return courseIndexInPointList===-1 ? 0 : pointList[courseIndexInPointList].points;
    }

    //edit here to get the 2 data values
    const handleSubmit = (event) => {
        console.log(pointList);
        event.preventDefault();
        const newResultsList = bdeList.map((element) => ({
            //TODO: Change options
            courseCode: element.courseCode,
            courseName: element.courseName,
            creditsAllocated: getPoints(element.courseCode),
            status: "Awaiting resultsList",
        }));
        setResultsList(newResultsList);
    };

    // Delete course code from resultsList, pointList, bdeList
    const handleDelete = (deletedCourseCode) => {
        const newResultsList = resultsList.filter(
            //TODO: Change options
            (element) => element.courseCode != deletedCourseCode
        );
        setResultsList(newResultsList);
        const deletedCourseIndex = pointList.findIndex(
            (element) => element.courseCode === deletedCourseCode
        );
        const newPointList = pointList.filter(
            (element) => element.courseCode !== deletedCourseCode
        );
        setPointList(newPointList);
        const newBdeList = bdeList.filter(
            //TODO: Change options
            (element) => element.courseCode != deletedCourseCode
        );
        setBdeList(newBdeList);
    };

    // Tracks credits allocated to each bde course code
    const handlePointChange = (event, editedCourseCode) => {
        console.log(editedCourseCode);
        const newPointList = [...pointList];
        const editedCourseIndex = newPointList.findIndex(
            (element) => element.courseCode === editedCourseCode
        );
        if (editedCourseIndex !== -1) {
            newPointList[editedCourseIndex].points = event.target.value;
        } else {
            newPointList.push({
                courseCode: editedCourseCode,
                points: event.target.value,
            });
        }

        newPointList.editedCourseCode = event.target.value;
        setPointList(newPointList);
    };

    //Updates whenever theres changes
    useEffect(() => {
        console.log(pointList);
    }, [pointList]);
    useEffect(() => {
        console.log(resultsList);
    }, [resultsList]);
    useEffect(() => {
        console.log(bdeList);
    }, [bdeList]);

    return (
        <div>
            <List>
                {bdeList.map((elem) => (
                    //TODO: Change options
                    <ListItem className="flex pt-4">
                        <ListItemText>
                            <Typography>
                                {elem.courseCode} {elem.courseName}
                            </Typography>
                        </ListItemText>
                        <input
                            className="w-48 pr-4"
                            type="number"
                            placeholder="Allocate Points..."
                            defaultValue={0}
                            onChange={(e) =>
                                handlePointChange(e, elem.courseCode)
                            }
                        />
                        <ButtonGroup>
                            <Button
                                text="text"
                                aria-label="submit"
                                edge="end"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <Button
                                text="text"
                                aria-label="submit"
                                edge="end"
                                onClick={() => handleDelete(elem.courseCode)}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default BiddingTable;
