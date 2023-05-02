import React from 'react';
import getSectionWrapperClassNames from "../utils/getSectionWrapperClassNames.js";
import { TIMELINE_INDEX } from "./home.jsx";
import './timeline.css';

function Timeline( props )
{
  return (
    <div id="timeline-wrapper" className={ getSectionWrapperClassNames( props.activeIndex, TIMELINE_INDEX ) }>
      <div id="timeline-content">
      <div class="timeline">
        <div class="container left">
          <div class="content">
            <h2>2017</h2>
            <p>Lorem ipsum..</p>
          </div>
        </div>
        <div class="container right">
          <div class="content">
            <h2>2016</h2>
            <p>Lorem ipsum..</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Timeline;