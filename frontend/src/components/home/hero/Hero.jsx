import React, {useState,useEffect} from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/courses');
  };
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row' style={{ color: 'ivory' }}>
            <Heading  subtitle='' title='Best Online Culinary Expertise' />
            <p style={{ color: 'darkblack', fontWeight: 'bold' }}><br/> Join our Live Class</p>
            <div className='button'>
            <button onClick={handleNavigate}>
          VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
        </button>
              
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
