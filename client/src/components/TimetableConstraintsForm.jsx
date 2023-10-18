import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem
} from '@mui/material';

function TimetableConstraintsForm({
  selectedBlockedDays,
  selectedEarliestStartTime,
  selectedLatestEndTime,
  handleBlockedDaysChange,
  handleEarliestStartTimeChange,
  handleLatestEndTimeChange,
}) {
  return (
    <List>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Blocked Days</InputLabel>
          <Select
            multiple
            value={selectedBlockedDays}
            onChange={handleBlockedDaysChange}
            label="Blocked Days"
          >
            <MenuItem value="MON">Monday</MenuItem>
            <MenuItem value="TUE">Tuesday</MenuItem>
            <MenuItem value="WED">Wednesday</MenuItem>
            <MenuItem value="THU">Thursday</MenuItem>
            <MenuItem value="FRI">Friday</MenuItem>
          </Select>
        </FormControl>
      </ListItem>

      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Earliest Start Time</InputLabel>
          <Select
            value={selectedEarliestStartTime}
            onChange={handleEarliestStartTimeChange}
            label="Earliest Start Time"
          >
            <MenuItem value="0800">8:00 AM</MenuItem>
            <MenuItem value="0900">9:00 AM</MenuItem>
          </Select>
        </FormControl>
      </ListItem>

      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Latest End Time</InputLabel>
          <Select
            value={selectedLatestEndTime}
            onChange={handleLatestEndTimeChange}
            label="Latest End Time"
          >
            <MenuItem value="1700">5:00 PM</MenuItem>
            <MenuItem value="1800">6:00 PM</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}

export default TimetableConstraintsForm;
