import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay }  from 'helpers/selectors';
import useVisualMode from 'hooks/useVisualMode';

const axios = require ('axios');


export default function Application(props) {
  
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers: {},
  })

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const path = `http://localhost:8001/api/appointments/${id}`
    return axios.put(path, {interview} )
    .then(() => {setState({...state, appointments})})
    .catch(error => console.log(error))
  }

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const path = `http://localhost:8001/api/appointments/${id}`
    return axios.delete(path)
    .then(() => setState({...state, appointments}))
    .catch(error => console.log(error))
  }

  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interviewers}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const path = `http://localhost:8001/api/appointments/${id}`
    return axios.put(path)
    .then(() => setState({...state, appointments}))
    .catch(error => console.log(error))
  }

  const appointments = getAppointmentsForDay(state, state.day);
  console.log(appointments)

  const interviewers= getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = day => setState({ ...state, day })


  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((all) => {
      const [days, appointments, interviewers] = all
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    })
    .catch(error => console.log(error))
  }, [])


  console.log(state)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}





