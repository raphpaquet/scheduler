import React from 'react';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';


export default function InterviewerList(props) {
  
  const { interviewers } = props;

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  const interviewerList = interviewers.map((interviewer) => {
    return (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={(event) => console.log("interviewer clicked") || props.setInterviewer(interviewer.id)} 
    />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
};

