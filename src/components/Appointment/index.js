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
  
  // DELETE THE APPOINTMENT 
  function deleteInterview() {
    
    transition(DELETING, true)
    
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  // EDIT APPOINTMENT
  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);

    props.editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }

  // TRANSITION TO CONFIRM
    function confirm() {
      transition(CONFIRM)
    }
  // TRANSITION TO EDIT 
    function onEdit() {
      transition(EDIT)
    }
  //TRANSITION TO SHOW  
    function onShow() {
      transition(SHOW)
    }
  //TRANSITION TO CREATE
    function onCreate() {
    transition(CREATE)
  }

  return (
    <article className="appointment" data-testid="appointment">
      
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
          onSave={edit}
          onCancel={back}
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={onEdit}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={onCreate}
        />
      )}

      {mode === ERROR_DELETE && 
        <Error
          message="Could not delete appointment"
          onClose={onShow}
        />
      }
    </article>
  )
}

