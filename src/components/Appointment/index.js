import React, { Fragment } from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import 'components/Appointment/styles.scss';



export default function Appointment(props) {

  const format = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />
 

  return (
    <article className="appointment">
      <header> {props.time} </header>
      {format}
    </article>
  )
}

