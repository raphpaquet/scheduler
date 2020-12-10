const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};


// Return an array with all the appointments for the day //
function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound) {
    return [];
  }
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

// function getAppointmentsForDay(state, day) {
//   let appointmentsForDay = [];
//   const dayOfWeek = day;
//   const selectedDay = state.days.filter(day => day.name === dayOfWeek)[0];
//   if (!selectedDay || selectedDay.length === 0) {
//     return appointmentsForDay;
//   } 
//   for (let appointment of selectedDay.appointments) {
//     appointmentsForDay.push(appointment);
//   }
//   return appointmentsForDay.map(appointment => state.appointments[appointment]);
// }



function getInterview(state, interview) {
  let interviewerData = {}
  if (!interview) {
    return null; 
  }
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer]
  interviewerData.student = student;
  interviewerData.interviewer = interviewer;
  return interviewerData;
}

//return an obj with interview data when passed an obj that contains an interviewer //
function getInterviewersForDay (state, day) {
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound) {
    return [];
  }
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}


export { getInterview, getAppointmentsForDay, getInterviewersForDay }