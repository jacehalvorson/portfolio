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
            <p>Bloomington, MN</p>
            <p>+1 (952) 447-7533</p>
            <a href="mailto:jacehalvorson33@gmail.com">jacehalvorson33@gmail.com</a>
          </div>
        </div>

        <div id="about-body">
          <img id="about-picture" src="/jacehalvorson.jpg" alt="Jace Halvorson's face" />

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
          <a id="resume-download" href="/JaceHalvorsonResume.pdf" download="JaceHalvorsonResume.pdf">
            <img src="/ResumeScreenshot.png" alt="Resume" width="300em"/>
            <div id="resume-download-icon">
              <i className="fas fa-cloud-arrow-down" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About;