import React, { useState, useEffect } from "react";
import "./courses.css";
import axiosInstance from "../../axios/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


const CoursesCard = () => {
  const [classdata, setClassdata] = useState([]);
  const dispatch = useDispatch
  useEffect(() => {
    axiosInstance.get('course-listing/')

      .then((res) => {
        console.log(res.data, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        setClassdata(res.data.classdata.filter(course => course.enabled))
        //enabled courses mathram filter cheyth eduthhhh.....
        console.log(res.data.classdata)
        classdata.forEach(course => {
          console.log(course.mentor,"jiiiiiii" );
        // dispatch(setMentorId(course.mentor))
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  return (
    <>
      <section className='coursesCard'>
        <div className='container grid2'>
          {classdata.map((val) => (
            <div className='items' key={val.id}>
                <div className='content flex'>
                  <div className='left'>
                    <div className='img'>
                      <img src={val.thumbnail} alt='' />
                    </div>
                  </div>
                  <div className='text'>
                    <h1>{val.class_name}</h1>
                    <div className='rate'>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <label htmlFor=''>(5.0)</label>
                    </div>
                    <div className='details'>
                     
                      <p>Price: {val.price}</p>
                      <p>Description: {val.course_description}</p>
                      <p>syllabus: {val.syllabus}</p>
                    
                    </div>
                  </div>
                </div>
                <div className='price'>
                  <h3>
                    {val.price} $
                  </h3>
                </div>
                <Link to={`/checkout/${val.id}`} state={{ courseInfo: { 
                  class_name: val.class_name, 
                  price: val.price,
                  course_description: val.course_description, 
                  thumbnail: val.thumbnail,
                  syllabus: val.syllabus,
                  mentor:val.mentor
                } }}>
                  <button className='outline-btn'>ENROLL NOW!</button>
                </Link>
              </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CoursesCard;



 