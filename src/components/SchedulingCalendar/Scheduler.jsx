import React, { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import FormModal from "./FormModal/FormModal";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../store/slices/appointmentSlice";
import { Link } from "react-router-dom";

export const Scheduler = () => {
  const { appointments } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    typeOfAppointment: "",
    patientData: {}
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    setModalIsOpen(true);
    setFormData((prevData) => ({
      ...prevData,
      selectInfo
    }));
  }

  function handleFormSubmit(formData) {
    const { selectInfo } = formData;

    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (formData.typeOfAppointment) {
      const startTime = new Date(selectInfo.startStr);
      const endTime = new Date(selectInfo.endStr);

      // Custom overlap check
      const isOverlap = calendarApi.getEvents().some((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        const overlapStart = Math.max(startTime.getTime(), eventStart.getTime());
        const overlapEnd = Math.min(endTime.getTime(), eventEnd.getTime());
        const overlapDuration = overlapEnd - overlapStart;

        return overlapDuration > 0;
      });

      if (isOverlap) {
        alert("This time slot is already booked. Please choose another time.");
        return;
      }
      const eventData = {
        id: createEventId(),
        title: formData.typeOfAppointment,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        extendedProps: {
          typeOfAppointment: formData.typeOfAppointment,
          patientData: formData.patient
        }
      };
      calendarApi.addEvent(eventData);
      dispatch(addAppointment(eventData));
    }
  }


  function handleEventClick(clickInfo) {
    // eslint-disable-next-line no-restricted-globals
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  return (
    <div className="demo-app">
      {/* <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      /> */}
      <div className="demo-app-main">
        <div className="flex justify-between items-center" style={{ width: "87vw" }}>
          <p className="ml-20 mb-3 font-bold text-2xl">Book an Appointment</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="upcoming-appointments">Scheduled Appointments</Link>
          </button>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          eventOverlap={false}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          // weekends={weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          events={appointments.appointmentList}
          // eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          slotMinTime="09:00:00" // start time for the calendar
          slotMaxTime="17:00:00" // end time for the calendar
          slotLabelInterval="00:30"
          slotDuration="00:15:00"
        /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
        />
      </div>
      {/* <button onClick={() => setModalIsOpen(true)} className="open-modal-btn">
                Open Form Modal
            </button> */}

      <FormModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        handleFormSubmit={handleFormSubmit}
        selectInfo={formData.selectInfo}
      />
    </div>
  );
};

function renderEventContent(eventInfo) {
  console.log(eventInfo, "eventInfo")
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <Link to="upcoming-appointments">Apmts</Link>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
