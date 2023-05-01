import React from "react";
import getSectionWrapperClassNames from "../utils/getSectionWrapperClassNames.js";
import { ABOUT_INDEX } from "./home.jsx";
import './about.css';

function About( props )
{
  return (
    <div id="about-wrapper" className={ getSectionWrapperClassNames( props.activeIndex, ABOUT_INDEX ) }>
      <div id="about-content">
        <div id="about-text">
          <p>
            I'm a software developer with a passion for learning and creating. I'm currently studying Computer Science at the University of Waterloo.
          </p>
          <p>
            I'm interested in full-stack web development, mobile development, and machine learning. I'm also interested in game development, and I'm currently working on a 2D game engine.
          </p>
          <p>
            I'm always looking for new opportunities to learn and grow as a developer. If you'd like to get in touch, feel free to send me an email at <a href="mailto:jacehalvorson33@gmail.com>">jacehalvorson33@gmail.com</a>
          </p>
        </div>
        <div id="about-picture" />
      </div>
    </div>
  )
}

export default About;