import React from "react";
import getSectionWrapperClassNames from "../utils/getSectionWrapperClassNames.js";
import { ABOUT_INDEX } from "./home.jsx";
import './about.css';

function About( props )
{
  return (
    <div id="about-wrapper" className={ getSectionWrapperClassNames( props.activeIndex, ABOUT_INDEX ) }>
      <div id="about-content">
        <div id="about-header">
          <img id="about-picture" src="/jacehalvorson.jpg" alt="Picture of Jace Halvorson" />
          <div id="about-titles">
            <h1>Jace Halvorson</h1>
            <h2>Software Engineer</h2>
            <a href="mailto:jacehalvorson33@gmail.com">jacehalvorson33@gmail.com</a>
            <p>+1 (952) 447-7533</p>
            <p>Bloomington, MN</p>
          </div>
        </div>

        <div id="about-text">
          <p>Welcome to my professional website! Take the time to explore some of the projects and experiences that have shaped my career.
             As you delve into the details of my work, you'll gain insight into my dedication to continuous learning, adaptability,
             and innovative problem-solving. Some of these projects were developed for class projects, and others were made for personal use.
             Please don't hesitate to reach out if you have any questions or would like to discuss potential collaboration opportunities.</p>
          <p>As a recent graduate from the University of Minnesota's College of Science and Engineering, I have an insatiable curiosity
             and a remarkable ability to learn quickly. My unwavering enthusiasm for learning enables me to stay on the cutting edge of
             emerging technologies and programming paradigms, which is crucial in today's ever-evolving tech landscape.</p>
          <p>My meticulous approach to software design prioritizes the creation of robust, adaptable, and maintainable code. I excel at
             devising efficient and scalable solutions that are built to withstand the test of time, anticipating future requirements and
             adaptions with ease. My well-rounded skills and passion for excellence make me a valuable asset to any organization seeking a
             dedicated and innovative software engineer.</p>
          <p></p>
          <a href="/JaceHalvorsonResume.pdf" type="download" >View my resume</a>
        </div>
      </div>
    </div>
  )
}

export default About;