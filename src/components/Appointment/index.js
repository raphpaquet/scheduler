import React, { Fragment } from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form"

import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import {getInterviewersForDay} from 'helpers/selectors';

const EMPTY = "EMPTY";
const SHOW = "SHOW"
const CREATE = "CREATE"



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  

  return (
    <article className="appointment">
      <header> 
        {props.time} 
      </header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE &&  
        <Form
          interviewers={[]}
          onSave={("onSave")}
          onCancel={back}
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  )
}

