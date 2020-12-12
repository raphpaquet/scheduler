import { useState, useEffect } from 'react';
import axios from 'axios'


export default function useApplicationData() {

  // state
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers: {},
  })
  
  // setDay
  const setDay = day => setState({ ...state, day })

  // Get API request then setState
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

  
  // bookInterview
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

    const removeSpot = () => {
      const weekDays = [...state.days]
      weekDays.map(day => {
        for (let appointment of day.appointments) {
          if (appointment === id) {
            day.spots = day.spots - 1;
          }
        }
        return weekDays;
      })
    }
    
    const path = `http://localhost:8001/api/appointments/${id}`
    return axios.put(path, {interview} )
    .then(() => {
      removeSpot(-1)
      setState({...state, appointments})})
  }
  
  
  // cancelInterview
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const addSpot = () => {
      const weekDays = [...state.days]
      weekDays.map(day => {
        for (let appointment of day.appointments) {
          if (appointment === id) {
            day.spots = day.spots + 1;
          }
        }
        return weekDays;
      })
    }
  
    const path = `http://localhost:8001/api/appointments/${id}`
    return axios.delete(path)
    .then(() => {
      addSpot(1)
      setState({...state, appointments})})
  }

  return { state, setState, setDay, bookInterview, cancelInterview }
}



