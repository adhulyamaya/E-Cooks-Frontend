// import React, {useState,useEffect} from "react"
// import Heading from "../../common/heading/Heading"
// import "./Hero.css"
// import { Link } from "react-router-dom"
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/courses');
//   };
//   return (
//     <>
//       <section className='hero'>
//         <div className='container'>
//           <div className='row' style={{ color: 'ivory' }}>
//             <Heading  subtitle='' title='Best Online Culinary Expertise' />
//             <p style={{ color: 'darkblack', fontWeight: 'bold' }}><br/> Join our Live Class</p>
//             <div className='button'>
//             <button onClick={handleNavigate}>
//           VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
//         </button>
              
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className='margin'></div>
//     </>
//   )
// }

// export default Hero

// import React from "react";
// import Heading from "../../common/heading/Heading";
// import { useNavigate } from "react-router-dom";
// import './Hero.css';
// import videoSource from "./e-cooks.mp4";

// const Hero = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/courses');
//   };

//   return (
//     <>
//       <section className='hero'>
//         <div className='video-container'>
//           <video autoPlay loop muted className='video-bg'>
//             <source src={videoSource} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className='container'>
//             <div className='row' style={{ color: 'ivory' }}>
//               <Heading subtitle='' title='Best Online Culinary Expertise' />
//               <p style={{ color: 'darkblack', fontWeight: 'bold' }}><br/> Join our Live Class</p>
//               <div className='button'>
//                 <button onClick={handleNavigate}>
//                   VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className='margin'></div>
//     </>
//   )
// }

// export default Hero;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import "./Hero.css";
import videoSource from "./pexel.mp4";

const Hero = () => {
  const navigate = useNavigate();
  const view = () => {
    navigate("/courses");
  };

  return (
    <>
      <section className="hero">
      <video autoPlay loop muted className="video-bg">
          <source src={videoSource}  />   
        </video>
        <div className="container" style={{ marginTop:'-350px' }}>
          <div className="row" style={{ color: "white" }}>
            <Heading 
              title="Best Online Culinary Expertise"
            />
            <div className="button">
              <button className="primary-btn" style={{ cursor: "pointer",height: '40px',padding: '0 10px', }}>
                GET STARTED NOW 
              </button>
              <button onClick={view} style={{ cursor: "pointer",height: '40px',padding: '0 25px', }}>
                VIEW CLASS
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};
export default Hero;