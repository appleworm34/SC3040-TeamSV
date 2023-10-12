import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const localizer = momentLocalizer(moment);
const minTime = moment().set({ hour: 7, minute: 0, second: 0 });
const maxTime = moment().set({ hour: 23, minute: 0, second: 0 });

const initialEvents = [
    {
      start: new Date(2023, 9, 10, 10, 30, 0),
      end: new Date(2023, 9, 10, 12, 30, 0),
      title: 'Event 1',
      description: 'hi'
    },
    {
      start: new Date(2023, 9, 11, 14, 0, 0),
      end: new Date(2023, 9, 11, 16, 0, 0),
      title: 'Event 2',
    },
    // Add more events here
];

const initialEvents1 = [
  {
    start: new Date(2023, 9, 10, 10, 30, 0),
    end: new Date(2023, 9, 10, 12, 30, 0),
    title: 'Event 1',
    description: 'hi'
  },
  {
    start: new Date(2023, 9, 11, 14, 0, 0),
    end: new Date(2023, 9, 11, 16, 0, 0),
    title: 'Event 2',
  },
  // Add more events here
];
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
      <strong>{event.title}</strong>
      <p>{event.description}</p>
    </div>
);

function Timetable() {
    const [eventLists, setEventLists] = useState({
      "0": initialEvents,
      "1": initialEvents1
    });
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [showEventList, setShowEventList] = useState({
      "0": false,
      "1": false
    });

    const handleEventHover = (event) => {
        const selectedEvent = [event]
        setSelectedEvent(selectedEvent);
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
                  events={selectedEvent}
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
                    Object.keys(eventLists).map((eventListKey) => (
                      <div key={eventListKey}>
                        <div className="flex items-center">
                          <h2 className="mr-5 mt-1">Event List {eventListKey}</h2>
                          <button onClick={() => 
                            toggleEventList(eventListKey)}
                          >
                            {showEventList[eventListKey] ? (<RemoveIcon fontSize="medium" />) : (<AddIcon fontSize="small" />)}
                          </button>
                        </div>
                        {showEventList[eventListKey.toString()] && (
                          <div>
                            {eventLists[eventListKey.toString()].map((event) => (
                              <div
                                key={event.id}
                                onMouseEnter={() => handleEventHover(event)}
                                onMouseLeave={() => handleEventHover([])}
                                className='cursor-pointer p-2'
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  }
                </div>
            </div>
      );
}

export default Timetable;
