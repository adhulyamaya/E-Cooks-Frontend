import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/mentoraxios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from "uuid";

import { setClassname, setDescription, setPrice, setSyllabus } from '../../feautures/mentorSlice/addClassSlice';
import { storage } from '../../firebase/firebaseconfig';

const AddClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null); 
  const createclass = useSelector((state) => state.createclass);
  const mentorId = useSelector((state) => state.mentorsignup.value.mentorId);

  const handleThumbnail = (e) => {
    setImage(e.target.files[0]);
  };

  const createClassSubmit = () => {
    if (!image) {
      console.error('No image selected');
      return;
    }

    const reference = ref(storage, `coursethumbnail/${image.name + uuidv4()}`);
    uploadBytes(reference, image)
      .then((snapshot) => {
        getDownloadURL(reference).then((url) => {
          console.log(url, 'Thumbnail URL');
          const datas = {
            mentorId: mentorId,
            classname: createclass.value.classname,
            description: createclass.value.description,
            price: createclass.value.price,
            syllabus: createclass.value.syllabus,
            imageUrl: url,
          };

          axiosInstance
            .post('addclass/', datas)
            .then((res) => {
              console.log(res.data, 'Created class data');
              if (res.data.message === 'success') {
                navigate('../classmanagement');
              }
            })
            .catch((error) => {
              console.error('Error creating class:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error uploading thumbnail:', error);
      });
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-secondary text-white p-5'>
        <h1>ADD new class</h1>
        <form>
          <div>
            <label htmlFor='classname'>CLASSNAME:</label>
            <input type='text' name='classname' className='formcontrol' onChange={(e) => dispatch(setClassname(e.target.value))} />

            <label htmlFor='classname'>DESCRIPTION:</label>
            <input type='text' name='description' className='formcontrol' onChange={(e) => dispatch(setDescription(e.target.value))} />

            <label htmlFor='classname'>PRICE:</label>
            <input type='text' name='price' className='formcontrol' onChange={(e) => dispatch(setPrice(e.target.value))} />

            <label htmlFor='classname'>SYLLABUS:</label>
            <input type='text' name='syllabus' className='formcontrol' onChange={(e) => dispatch(setSyllabus(e.target.value))} />

            {/* Input for course thumbnail */}
            <label htmlFor='thumbnail'>COURSE THUMBNAIL:</label>
            <input type='file' name='thumbnail' className='formcontrol' onChange={handleThumbnail} />
          </div>
        </form>
        <button className='btn btn-primary mt-3' onClick={createClassSubmit}>
          Create Class
        </button>
      </div>
    </div>
  );
};

export default AddClass;
