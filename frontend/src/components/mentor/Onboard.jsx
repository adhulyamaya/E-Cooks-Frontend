import React, { useState } from "react";
import {
  changeFullname,
  changeEmail,
  changeBio,
  changeExpertise,
  changeExperience,
  changeAge,
  changeImage,
  changeAddress,
  changeCertificate,
  changeAvailabilityStartTime,
  changeAvailabilityEndTime
} from "../../feautures/mentorSlice/mentorOnboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../axios/mentoraxios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Onboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mentoronboard = useSelector((state) => state.mentoronboard);
  const location = useLocation();
  const mentorId = location.state?.mentorId || null;

  const commonInputStyle = { width: "100%" };

  const [errors, setErrors] = useState({
    fullname: false,
    email: false,
    bio: false,
    expertise: false,
    experience: false,
    age: false,
    address: false,
    certificate: false,
    availability_start_time: false,
    availability_end_time: false,
  });

  const validateFields = () => {
    const newErrors = {
      fullname: !mentoronboard.value.fullname,
      email: !validateEmail(mentoronboard.value.email),
      bio: !mentoronboard.value.bio,
      expertise: !mentoronboard.value.expertise,
      experience: !mentoronboard.value.experience,
      age: !mentoronboard.value.age,
      address: !mentoronboard.value.address,
      certificate: !mentoronboard.value.certificate,
      availability_start_time: !mentoronboard.value.availability_start_time,
      availability_end_time: !mentoronboard.value.availability_end_time,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((err) => err);
  };

  const validateEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const mentorSubmit = () => {
    if (!validateFields()) {
      // Fields are not valid, do not submit
      return;
    }

    const datas = {
      mentor_id: mentorId,
      fullname: mentoronboard.value.fullname,
      email: mentoronboard.value.email,
      bio: mentoronboard.value.bio,
      expertise: mentoronboard.value.expertise,
      experience: mentoronboard.value.experience,
      age: mentoronboard.value.age,
      image: mentoronboard.value.image,
      address: mentoronboard.value.address,
      certificate: mentoronboard.value.certificate,
      availability_start_time: mentoronboard.value.availability_start_time,
      availability_end_time: mentoronboard.value.availability_end_time,
    };
    axiosInstance.post("mentoronboard/", datas).then((res) => {
      if (res.data.message === "success") {
        navigate("../mentorlogin");
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: `url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form className="mt-4 mb-4 m-4">
        <div className="form-group mb-1">
          <TextField
            required
            id="fullname"
            label="Full Name"
            variant="outlined"
            placeholder="Full Name"
            value={mentoronboard.value.fullname}
            onChange={(e) => dispatch(changeFullname(e.target.value))}
            error={errors.fullname}
            helperText={errors.fullname ? "Full name is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            placeholder="Email"
            value={mentoronboard.value.email}
            onChange={(e) => dispatch(changeEmail(e.target.value))}
            error={errors.email}
            helperText={errors.email ? "Enter a valid email" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="bio"
            label="Bio"
            variant="outlined"
            placeholder="Bio"
            value={mentoronboard.value.bio}
            onChange={(e) => dispatch(changeBio(e.target.value))}
            error={errors.bio}
            helperText={errors.bio ? "Bio is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="expertise"
            label="Expertise"
            variant="outlined"
            placeholder="Expertise"
            value={mentoronboard.value.expertise}
            onChange={(e) => dispatch(changeExpertise(e.target.value))}
            error={errors.expertise}
            helperText={errors.expertise ? "Expertise is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="experience"
            label="Experience"
            variant="outlined"
            placeholder="Experience"
            value={mentoronboard.value.experience}
            onChange={(e) => dispatch(changeExperience(e.target.value))}
            error={errors.experience}
            helperText={errors.experience ? "Experience is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="age"
            label="Age"
            variant="outlined"
            placeholder="Age"
            value={mentoronboard.value.age}
            onChange={(e) => dispatch(changeAge(e.target.value))}
            error={errors.age}
            helperText={errors.age ? "Age is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Profile Image</label>
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile02"
                onChange={(e) => dispatch(changeImage(e.target.files[0]))}
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="address"
            label="Address"
            variant="outlined"
            placeholder="Address"
            value={mentoronboard.value.address}
            onChange={(e) => dispatch(changeAddress(e.target.value))}
            error={errors.address}
            helperText={errors.address ? "Address is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="certificate"
            label="Certificate"
            variant="outlined"
            placeholder="Certificate"
            value={mentoronboard.value.certificate}
            onChange={(e) => dispatch(changeCertificate(e.target.value))}
            error={errors.certificate}
            helperText={errors.certificate ? "Certificate is required" : ""}
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="availability_start_time"
            label="Availability Start Time"
            variant="outlined"
            type="time"
            value={mentoronboard.value.availability_start_time}
            onChange={(e) =>
              dispatch(changeAvailabilityStartTime(e.target.value))
            }
            error={errors.availability_start_time}
            helperText={
              errors.availability_start_time
                ? "Availability Start Time is required"
                : ""
            }
            sx={commonInputStyle}
          />
        </div>
        <div className="form-group mb-1">
          <TextField
            required
            id="availability_end_time"
            label="Availability End Time"
            variant="outlined"
            type="time"
            value={mentoronboard.value.availability_end_time}
            onChange={(e) =>
              dispatch(changeAvailabilityEndTime(e.target.value))
            }
            error={errors.availability_end_time}
            helperText={
              errors.availability_end_time
                ? "Availability End Time is required"
                : ""
            }
            sx={commonInputStyle}
          />
        </div>
        <Button
          variant="contained"
          onClick={mentorSubmit}
          sx={{ width: "100%" }}
        >
          Mentor Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Onboard;
