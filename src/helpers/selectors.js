
export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  const dayOfWeek = day;
  const selectedDay = state.days.filter(day => day.name === dayOfWeek)[0];
  if (!selectedDay || selectedDay.length === 0) {
    return appointmentsForDay;
  } 
  for (let appointment of selectedDay.appointments) {
    appointmentsForDay.push(appointment);
  }
  return appointmentsForDay.map(appointment => state.appointments[appointment]);
}
