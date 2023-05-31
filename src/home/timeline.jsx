import React from 'react';
import './timeline.css';

const timelineEventList = [
  {
    title: "Shift Manager",
    employer: "Dairy Queen",
    startDate: "February 2019",
    endDate: "August 2021",
    description: [
      "Managed and trained employees to ensure quality customer service.",
      "Supported a safe work environment by properly cleaning and maintaining equipment."
    ]
  },
  {
    title: "Security Monitor",
    employer: "University of Minnesota",
    startDate: "October 2021",
    endDate: "May 2022",
    description: "Kept constant, concise, and meticulous communication via logging and radio discussion. Held continuous surveillance and campus building patrols to ensure security and safety for both students and faculty, and provided assistance to students with safe travel through UMN’s 24/7 safe-walk program."
  },
  {
    title: "Firmware Engineering Intern",
    employer: "Seagate Technology",
    startDate: "May 2022",
    endDate: "December 2022",
    description: [
      "Developed, improved, and tested controller firmware for HDD products.",
      "Effectively utilized engineering strategies while addressing problems to improve adaptability and robustness of code.",
      "Frequent discussion with stakeholders to find the ideal implementation of systems."
    ]
  }
];

function TimelineEvent( props )
{
  const isEventIndexEven = ( props.eventIndex % 2 === 0 );

  return (
    <div className={ isEventIndexEven ? "timeline-event right" : "timeline-event left" }>
      { isEventIndexEven ? <h3 className="timeline-date-range">{ props.startDate } - { props.endDate }</h3> : <></> }
      <i className="timeline-circle" />
      <div className="timeline-event-content">
        <h2>{ props.title }</h2>
        <h3>{ props.employer }</h3>
        <ul>
          { console.log( props.description )}
          { ( props.description instanceof Array )
              ? props.description.map( ( bulletPoint ) => (
                ( <li>{ bulletPoint }</li> )
              ))
              : ( <p>{ props.description }</p> )
          }
        </ul>
      </div>
      { isEventIndexEven ? <></> : <h3 className="timeline-date-range">{ props.startDate } - { props.endDate }</h3> }
      
    </div>
  )
}

function Timeline( props )
{
  return (
    <div id="timeline-wrapper" className="section-wrapper">
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