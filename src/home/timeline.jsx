import React from 'react';
import getSectionWrapperClassNames from "../utils/getSectionWrapperClassNames.js";
import { TIMELINE_INDEX } from "./home.jsx";
import './timeline.css';

const timelineEventList = [
  {
    title: "Shift Manager",
    employer: "Dairy Queen",
    startDate: "February 2019",
    endDate: "August 2021",
    description: "Managed a team of 10+ employees to ensure smooth operation of the store."
  },
  {
    title: "Security Monitor",
    employer: "University of Minnesota",
    startDate: "October 2021",
    endDate: "May 2022",
    description: "Kept constant, concise, and meticulous communication via logging and radio discussion.\
    Continuous surveillance and campus building patrols to ensure security and safety for both students and faculty.\
    Aided students with safe travel through UMN’s 24/7 safe-walk program."
  },
  {
    title: "Firmware Engineering Intern",
    employer: "Seagate Technology",
    startDate: "May 2022",
    endDate: "December 2022",
    description: "Developed, improved, and tested controller firmware for HDD products.\
    Effectively utilized engineering strategies while addressing problems to improve adaptability and robustness of code.\
    Frequent discussion with stakeholders to find the ideal implementation of systems."
  }
];

function TimelineEvent( props )
{
  return (
    <div className={ ( props.eventIndex % 2 === 0 ) ? "timeline-event right" : "timeline-event left" }>
      {/* <h3 className="timeline-date-range">{ props.startDate } - { props.endDate }</h3> */}
      <i className="timeline-circle" />
      <div className="timeline-event-content">
        <h2>{ props.title }</h2>
        <h3>{ props.employer }</h3>
        <p>{ props.description }</p>
      </div>
    </div>
  )
}

function Timeline( props )
{
  return (
    <div id="timeline-wrapper" className={ getSectionWrapperClassNames( props.activeIndex, TIMELINE_INDEX ) }>
      <div id="timeline-content">

        {/* Map over event list and create a timeline event for each one */
        timelineEventList.map( ( event, index ) => (
          <TimelineEvent
            eventIndex={ index }
            title={ event.title }
            employer={ event.employer }
            startDate={ event.startDate }
            endDate={ event.endDate }
            description={ event.description }
          />
        ))}
      </div>
    </div>
  )
}

export default Timeline;