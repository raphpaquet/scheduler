import React from 'react';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"
const ERROR_SAVE='ERROR_SAVE';
const ERROR_DELETE="ERROR_DELETE";




export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

// SAVE THE APPOINTMENT
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))
  }
  
// CONFIRM TO DELETE
  function confirm() {
    transition(CONFIRM)
  }

// DELETE THE APPOINTMENT 
  function deleteInterview() {

    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

// EDIT THE APPOINTMENT
  function edit() {
    transition(EDIT)
  }


  return (
    <article className="appointment">
      <header> 
        {props.time} 
      </header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && 
        <Confirm 
          message="Delete the appointment ?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      }

      {mode === CREATE &&  
        <Form
          interviewers={props.interviewers}
          onSave={(save)}
          onCancel={back}
        />
      }

      {mode === EDIT && 
        <Form 
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={() => transition(SHOW)}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={edit}
        />
      )}


    </article>
  )
}

