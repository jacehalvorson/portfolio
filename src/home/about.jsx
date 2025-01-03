import React from "react";
import './about.css';

function About( props )
{
  return (
    <div id="about-wrapper" className="section-wrapper">
      <div id="about-content">
        <div id="about-header">
          <div id="about-titles">
            <h1>Jace Halvorson</h1>
            <h2>Software Engineer</h2>
            <a href="mailto:jacehalvorson33@gmail.com">jacehalvorson33@gmail.com</a>
          </div>
        </div>

        <div id="about-body">
          <img id="about-picture" src="/images/jacehalvorson.jpg" alt="Jace Halvorson's face" />

          <div id="about-body-text">
            <p>Welcome to my professional website! Please don't hesitate to reach out if you have any questions or would like to discuss
            potential collaboration opportunities.</p>
            <p>As a recent graduate from the University of Minnesota's College of Science and Engineering, I have a strong curiosity for
            learning new tech stacks and a passion for solving complex problems. This, coupled with my ability to learn quickly,
            is what allows me to stay on the cutting edge of emerging technologies and programming paradigms, which is crucial
            in today's ever-evolving tech landscape.</p>
            <p></p>
          </div>
        </div>

        <div id="about-resume">
          <div id="about-resume-text" >
            <p>Take the time to explore some of the projects and experiences that have shaped my career.
            As you delve into the details of my work, you'll gain insight into my dedication to continuous learning, adaptability,
            and innovative problem-solving. Some of these projects were developed for class projects, and others were made for personal use.</p>
            <p>My meticulous approach to software design prioritizes the creation of robust, adaptable, and maintainable code. I excel at
            devising efficient and scalable solutions that are built to withstand the test of time, anticipating future requirements and
            adaptations with ease. My well-rounded skills and passion for excellence make me a valuable asset to any organization seeking a
            dedicated and innovative software engineer.</p>
          </div>
          <a id="resume-download" href="/JaceHalvorsonResume.pdf" download>
            <img src="/images/ResumeScreenshot.png" alt="Resume" width="300em"/>
            <div id="resume-download-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path d="M10.738 3.25c-.774 0-1.419.591-1.487 1.362a37.118 37.118 0 0 0-.107 4.845l-.253.018l-1.49.108a1.26 1.26 0 0 0-.97 1.935a16.055 16.055 0 0 0 4.163 4.395l.596.429a1.388 1.388 0 0 0 1.62 0l.596-.429a16.054 16.054 0 0 0 4.162-4.395a1.26 1.26 0 0 0-.97-1.935l-1.49-.108a42.986 42.986 0 0 0-.252-.018c.07-1.615.034-3.234-.107-4.845a1.492 1.492 0 0 0-1.487-1.362h-2.524Zm-.056 6.865a35.624 35.624 0 0 1 .063-5.365h2.51a35.61 35.61 0 0 1 .064 5.365a.75.75 0 0 0 .711.796c.324.016.647.036.97.06l1.081.079a14.555 14.555 0 0 1-3.55 3.645l-.53.381l-.532-.381a14.554 14.554 0 0 1-3.55-3.646L9 10.972c.323-.024.647-.044.97-.06a.75.75 0 0 0 .712-.796Z" />
                <path d="M5.75 17a.75.75 0 0 0-1.5 0v2c0 .966.784 1.75 1.75 1.75h12A1.75 1.75 0 0 0 19.75 19v-2a.75.75 0 0 0-1.5 0v2a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.25-.25v-2Z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About;