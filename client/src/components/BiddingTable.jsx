import React, { useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    ButtonGroup,
    Chip,
    Typography,
} from "@mui/material";

function BiddingTable({
    bdeList,
    setBdeList,
    resultsList,
    setResultsList,
    pointList,
    setPointList,
    creditScore,
    creditAllocationValidity,
    setCreditAllocationValidity,
}) {
    const [dummyPointList, setDummyPointList] = useState([]);
    const [remaining_credits, setRemainingCredits] = useState(creditScore);

    function getPoints(courseCode) {
      if (dummyPointList.length===0) return 0;
        const courseIndexInPointList = dummyPointList.findIndex(
            (element) => element.courseCode === courseCode
        );
        return (courseIndexInPointList === -1
            ? 0
            : parseInt(dummyPointList[courseIndexInPointList].points, 10));
    }

    //edit here to get the 2 data values
    const handleSubmit = (event) => {
        console.log("Handle Submit called");
        
        const newResultsList = bdeList.map((element) => ({
            //TODO: Change options
            courseCode: element.courseCode,
            courseName: element.courseName,
            creditsAllocated: getPoints(element.courseCode),
            status: "Awaiting resultsList",
        }));
        setResultsList(newResultsList);
        setPointList(dummyPointList);
        console.log("Handle Submit ended");
    };

    // Delete course code from resultsList, pointList, bdeList
    const handleDelete = (deletedCourseCode) => {
        console.log("Handle Delete called");

        const newResultsList = resultsList.filter(
            //TODO: Change options
            (element) => element.courseCode != deletedCourseCode
        );
        setResultsList(newResultsList);

        const newPointList = pointList.filter(
            (element) => element.courseCode !== deletedCourseCode
        );
        setPointList(newPointList);

        setDummyPointList(pointList);

        const newBdeList = bdeList.filter(
            //TODO: Change options
            (element) => element.courseCode != deletedCourseCode
        );
        setBdeList(newBdeList);

        let cur_allocated_credits = 0;
        console.log(`start credits ${cur_allocated_credits}`)
        dummyPointList.forEach((element) => {
            cur_allocated_credits += parseInt(element.points,10);
        });
        console.log(`end credits ${cur_allocated_credits}`)
        setRemainingCredits(creditScore - cur_allocated_credits);
        setCreditAllocationValidity(cur_allocated_credits <= creditScore);


    };

    // Tracks credits allocated to each bde course code
    const handlePointChange = (event, editedCourseCode) => {
        console.log(editedCourseCode);

        const newPointList = [...dummyPointList];
        const editedCourseIndex = newPointList.findIndex(
            (element) => element.courseCode === editedCourseCode
        );
        if (editedCourseIndex !== -1) {
            newPointList[editedCourseIndex].points = event.target.value;
        } else {
            newPointList.push({
                courseCode: editedCourseCode,
                points: parseInt(event.target.value, 10),
            });
        }
        setDummyPointList(newPointList);

        let cur_allocated_credits = 0;
        console.log(`start credits ${cur_allocated_credits}`)
        dummyPointList.forEach((element) => {
            cur_allocated_credits += parseInt(element.points,10);
        });
        console.log(`end credits ${cur_allocated_credits}`)
        setRemainingCredits(creditScore - cur_allocated_credits);
        setCreditAllocationValidity(cur_allocated_credits <= creditScore);
        
    };

    //Updates whenever theres changes
    useEffect(() => {
        console.log("UE dummyPointList");
        console.log(dummyPointList);
    }, [dummyPointList]);

    useEffect(() => {
      console.log("UE remaining_credits");
      console.log(remaining_credits);
  }, [remaining_credits]);

    useEffect(() => {
        console.log("UE pointList");
        console.log(pointList);
    }, [pointList]);

    useEffect(() => {
        console.log("UE resultsList");
        console.log(resultsList);
    }, [resultsList]);
    // When there is new BDEs added, set point to default 0, unless there is already points prior

    useEffect(() => {
        console.log("UE bdeList");
        console.log(bdeList);
        const newPointList = bdeList.map((element) => ({
            courseCode: element.courseCode,
            points: getPoints(element.courseCode),
        }));
        setDummyPointList(newPointList);
    }, [bdeList]);

    useEffect(() => {
        console.log("creditAllocationValidity");
        console.log(creditAllocationValidity);
    }, [creditAllocationValidity]);

    return (
        <div>
            <List>
                {bdeList.map((elem) => (
                    //TODO: Change options
                    <ListItem className="flex pt-4">
                        <ListItemText>
                            <Typography>
                                {elem.courseCode} {elem.courseName}{" "}
                            </Typography>
                        </ListItemText>
                        <input
                            className="w-48 pr-4"
                            type="number"
                            placeholder="Allocate Points..."
                            defaultValue={getPoints(elem.courseCode)}
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
                                disabled={!creditAllocationValidity}
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
            <div className="flex justify-evenly">
                {bdeList.length > 0 && (
                    <Chip
                        label={
                            creditAllocationValidity
                                ? "Click submit to confirm ur bids..."
                                : "Not enough credits for allocation, do double check..."
                        }
                        variant="outlined"
                        color={creditAllocationValidity ? "success" : "error"}
                    />
                )}

                <Chip
                    label={`Remaining credits: ${remaining_credits}`}
                    variant="outlined"
                    color={creditAllocationValidity ? "success" : "error"}
                />
            </div>
        </div>
    );
}

export default BiddingTable;
