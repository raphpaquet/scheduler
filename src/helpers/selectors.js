
// Return an array with all the appointments for the day //
function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound) {
    return [];
  }
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

//return an obj with interview data when passed an obj that contains an interviewer //
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

//return an array with all the interviewers available for the day//
function getInterviewersForDay (state, day) {
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  if(!dayFound) {
    return [];
  }
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}


export { getInterview, getAppointmentsForDay, getInterviewersForDay }