import React, { useState } from "react";
import projectCardList from "../utils/projectCardList.js";
import '../style/Home.css';
import '../style/Projects.css';
import '../style/About.css';

function Card( props )
{
  return (
    <div className="card-wrapper" onMouseOver={ props.mouseOverFunction }>
      <div className="card" id={ props.id }>
        <div
          className="card-background"
          style={{backgroundImage: `linear-gradient( rgba( 0, 0, 0, 0.3 ), rgba( 0, 0, 0, 0.3 ) ), url( ${ props.image } )` }}>
        </div>
        <h2 className="card-title">{ props.title }</h2>
        <p className="card-text">{ props.description }</p>
        <a href={ props.href }>
          <button className="card-button">Check it out</button>
        </a>
      </div>
      <div className="card-border"></div>
    </div>
  )
}

function MenuBackground( props )
{
  return (
    <>
      <div
        id="menu-background"
        style={{ backgroundPosition: `${ ( props.activeIndex * -25 ) - 25 }% 0%` }}
      />

      <div id="menu-background-picture" />
    </>
  )
}

function About( )
{
  return (
    <div id="about-wrapper">
      <h1 id="about-title">About</h1>
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

function Timeline( )
{
  return (
    <div id="timeline-wrapper">
      <h1 id="timeline-title">Timeline</h1>
      <div id="timeline-content">
        <div id="timeline-text">
          <p>
            I started programming in high school, where I learned the basics of Java and C++. I also learned the basics of web development, and I created a few websites for school projects.
          </p>
          <p>
            I started studying Computer Science at the University of Waterloo in 2019. I've learned a lot about programming, and I've also learned a lot about the software development process.
          </p>
          <p>
            I've worked on a few projects, including a 2D game engine, a mobile app, and a few websites. I've also worked on a few projects with other people, and I've learned a lot about working in a team.
          </p>
        </div>
        <div id="timeline-picture" />
      </div>
    </div>
  )
}

function Home( )
{
  const [ activeIndex, setActiveIndex ] = useState( 0 );

  return (
    <main id="home-main">
      <div id="projects-wrapper">
        <h1 id="cards-title">Projects</h1>
        <div id="menu">
          <div id="menu-items">
            {
              ( projectCardList )
              ? ( projectCardList.map( ( card, cardIndex ) => 
                (
                  <Card
                    title={ card.title }
                    description={ card.description }
                    image={ card.image }
                    href={ card.href }
                    mouseOverFunction={ function( ){ setActiveIndex( cardIndex ) } }
                  />
                ) ) )
              : ( <div></div> )
            }
          </div>

          <MenuBackground />
        </div>
      </div>

      <About />
      <Timeline />
    </main>
  );
}

export default Home;