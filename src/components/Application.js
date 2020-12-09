import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from "./Appointment";

const axios = require ('axios');


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Elvis Gratton",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Maria Carey",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Drake",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "5pm",
//   }
// ];



export default function Application(props) {
  // const [day, setDay] = useState(["Monday"]);
  // const [days, setDays] = useState([]);
  
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  })
  
  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day })
  // const setDays = days => setState(prev => ({ ...prev, days}))
  
  // const state = { day: "Monday", days:[]};
  // setState({ ...state, day:"Tuesday" });



  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
    .then((all) => {
      console.log(all)
      setState(prev => ({ ...prev, days}))
      setState(prev => ({ ...prev, appointments}))
      // setState(prev => ({ ...prev, appointments}))
      // setState(prev => ({ ...prev, days}))
    })
  }, [])



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
        {dailyAppointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment}/>
        })}
      </section>
    </main>
  );
}


