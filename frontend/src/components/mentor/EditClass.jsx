import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setClassname, setDescription, setPrice, setSyllabus } from '../../feautures/mentorSlice/addClassSlice';
import axiosInstance from '../../axios/mentoraxios';
import { useParams } from 'react-router-dom';
import MentorHeader from "./MentorHeader";
import MentorSidebar from "./MentorSidebar";
const EditClass=()=> {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {id}= useParams()
    console.log(id);

    const [classdata, setClassdata] = useState({
        id:id,
        classname:"",
        description:"",
        price:"",
        syllabus:"",
        
        
    });
    
    const classnameEditHandle=(e)=>{
        setClassdata({...classdata,classname:e.target.value});
        dispatch(setClassname(e.target.value));
         console.log(classdata.classname,"aaaaaaaaaaaaaaaaaa");
    }

    const descriptionEditHandle=(e)=>{
        setClassdata({...classdata,description:e.target.value});
        dispatch(setDescription(e.target.value));
        // console.log(data.name,"aaaaaaaaaaaaaaaaaa");
    }

    const priceEditHandle=(e)=>{
        setClassdata({...classdata,price:e.target.value});
        dispatch(setPrice(e.target.value));
        // console.log(data.name,"aaaaaaaaaaaaaaaaaa");
    }

    const syllabusEditHandle=(e)=>{
        setClassdata({...classdata,syllabus:e.target.value});
        dispatch(setSyllabus(e.target.value));
        // console.log(data.name,"aaaaaaaaaaaaaaaaaa");
    }


    const editClassSubmit = () => {
        axiosInstance.post("editclass/", classdata)
          .then((res) => {
            console.log(res.data, "???????????????????");
            navigate('../classmanagement');
          });
      };

    useEffect(()=>{
        axiosInstance.get(`geteditdata/${id}`)
        .then((res)=>{
            console.log(res.data,"just ");
            setClassdata({
                ...classdata,
                id: res.data.data.id,
                classname: res.data.data.class_name,
                description: res.data.data.course_description,
                syllabus: res.data.data.syllabus,
                date: res.data.data.date,
                start_datetime: res.data.data.start_datetime,
                end_datetime: res.data.data.end_datetime,
                thumbnail: res.data.data.thumbnail,
                schedule: res.data.data.schedule,
                price: res.data.data.price
            })
            
        })
    },[])
    console.log(classdata,"just checking");
   





  return (
    <div style={{ display: "flex" }}>
    <MentorSidebar/>
      <div style={{ flex: 1, padding: "20px", margin: 0 }}>
      <MentorHeader />

        <div className='w-50 border bg-secondary text-white p-5'>
        <div style={{ flex: 1, padding: "20px", margin: 0 }}>
        <h3>EDIT USER DETAILS </h3>
        <br />
        <br />
       
        <form>
            <div>
                <label htmlFor="classname">Classname:</label>
                <input type="text" value={classdata.classname} name='classname' className='form-control' 
                onChange={classnameEditHandle}/>
            </div>
            <div>
                <label htmlFor="description">description :</label>
                <input type="text" value={classdata.description} name='description' className='form-control' 
                onChange={descriptionEditHandle}/>
            </div>
            <div>
                <label htmlFor="price">price:</label>
                <input type="text" value={classdata.price} name='price' className='form-control' 
                onChange={priceEditHandle}/>
            </div>
            <div>
                <label htmlFor="syllabus">syllabus:</label>
                <input type="text" value={classdata.syllabus} name='syllabus' className='form-control' 
                onChange={syllabusEditHandle}/>
            </div>
        </form>
        <button className='btn btn-info' onClick={editClassSubmit}>Submit</button>
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default EditClass