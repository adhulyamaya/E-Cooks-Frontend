import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/additional/Loader";
import Mentorssignup from "./components/mentor/Mentorssignup";
import MentorLogin from "./components/mentor/MentorLogin";
import Onboard from "./components/mentor/Onboard";
import Mentorsmanage from "./components/admin/Mentorsmanage";
import About from "./components/about/About";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import MentorDashboard from "./components/mentor/MentorDashboard";
import ClassManagement from "./components/mentor/ClassManagement";
import AddClass from "./components/mentor/AddClass";
import EditClass from "./components/mentor/EditClass"
import DeleteClass from "./components/mentor/DeleteClass";
import CourseManage from "./components/admin/CourseManage";
import Chekout from "./components/checkout/Chekout";
import Ordersucess from "./components/order/Ordersucess";
import VideoPlayer from "./components/videoclass/VideoPlayer";
//  import  VideoRoom  from "./components/videoclass/VideoRoom";
import { VideoRoom } from "./components/videoclass/VideoRoom";
import Adminlogin from "./components/admin/Adminlogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import SideBar from "./components/admin/SideBar";
import Navbar from "./components/admin/Navbar";
import PurchasedCourses from "./components/mentor/PurchasedCourses";
import MyCourses from "./components/Mycourses";

import ProtectedRouteUsers from "./ProtectedRoute/ProtectedRouteUsers";
import UserNav from "./components/UserNav";
// import Chat from "./chat/ChatRoom";
import ChatRoomMentor from "./chat/ChatRoomMentor";
import Chat from "./chat/ChatRoom";
// import VideoClass from "./components/videoclass/VideoClass";
import EntrolleStudentCourseList from "./components/admin/EntrolleStudentCourseList";




// using LazyLoader for codesplitting - intial loading faster ( lazy() + <Suspense> ) */}

const Userlogin = lazy(() => import("./components/Userlogin"));
const Usersignup = lazy(() => import("./components/Usersignup"));
const Home = lazy(() => import("./components/home/Home"));
const UserProfile = lazy(() => import("./components/UserProfile"));
// const Adminlogin = lazy(() => import("./components/admin/Adminlogin"));
const AdminHome = lazy(() => import("./components/admin/Adminhome"));
const AdminProfile = lazy(() => import("./components/admin/AdminProfile"));
const Create = lazy(() => import("./components/admin/Create"));
const EditUser = lazy(() => import("./components/admin/EditUser"));
const DeleteUser = lazy(() => import("./components/admin/DeleteUser"));
const CourseHome= lazy (() => import("./components/allcourses/CourseHome") );
const VideoClass= lazy (() => import("./components/videoclass/VideoClass") );



const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return loading ? <Loader /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense>
          <Routes>
              {/* user routes */}
            <Route path="/login" element={<Userlogin />} />
            <Route path="/signup" element={<Usersignup />} />
            <Route path="/" element={ <LoaderWrapper><Home /></LoaderWrapper>}/>
            <Route path="/user-profile" element={<ProtectedRoute path="/user-profile" element={UserProfile} />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<CourseHome />} />
            <Route  path="/team" element={<Team />} />
            <Route  path="/pricing" element={<Pricing />} />
            <Route  path="/contact" element={<Contact />} />
            <Route path="/checkout/:courseId" element={<Chekout />} />
            <Route path="/ordersuccess" element={<Ordersucess/>}/>
            <Route path="/mycourses" element={<MyCourses/>}/> 
            <Route path="/usernav" element={<UserNav/>}/> 
            <Route path="/chatroom" element={<Chat />}/> 
            <Route path="/videoplayer" element={<VideoPlayer/>}/>
            <Route path="/videoroom" element={<VideoRoom/>}/>
            <Route path="/VideoClass" element={<VideoClass/>}/>
           

            {/* admin routes */}            
            <Route path="/adminlogin" element={<Adminlogin />} />
            {/* <Route path="/admin-home" element={<AdminHome />} /> */}
            <Route path="/admin-home" element={<ProtectedRouteUsers path="/admin-home" element={AdminHome} userType="admin" />}
            />
            {/* <ProtectedRouteUsers path="/admin-home" userType="admin" element={<AdminHome />} /> */}
            <Route path="/admin-profile"element={<AdminProfile />}/>
            <Route path="admin-home/mentors-manage" element={<Mentorsmanage />} />
            <Route path="admin-home/course-manage" element={<CourseManage />} />
            <Route path="admin-home/entrolledstudentcourselist" element={<EntrolleStudentCourseList />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/delete/:id" element={<DeleteUser />} />
            <Route path="/mentorsmanage" element={<Mentorsmanage />} />
            <Route path="/coursemanage" element={<CourseManage />} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/navbar" element={<Navbar />} />   
                     

            {/* {mentor routes} */}
            <Route path="/mentorsignup" element={<Mentorssignup />} />
            <Route path="/mentorlogin" element={<MentorLogin />} />
            <Route path="/mentoronboard" element={<Onboard />} />
            <Route path="/mentordashboard" element={<MentorDashboard />} />
            {/* <ProtectedRouteUsers path="/mentordashboard" userType="mentor" element={<MentorDashboard />} /> */}
            <Route path="/classmanagement" element={<ClassManagement />} />
            <Route path ="/addclass" element={<AddClass/>}/>
            <Route path="/classmanagement/editclass/:id" element={<EditClass />} />
            <Route path="/classmanagement/deleteclass/:id" element={<DeleteClass />} />
            <Route path="/purchased courses" element={<PurchasedCourses />} />
            <Route path="/chatroommentor" element={<ChatRoomMentor />} />

          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
