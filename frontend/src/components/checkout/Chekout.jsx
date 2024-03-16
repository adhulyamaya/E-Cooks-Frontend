import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useLocation } from 'react-router-dom';
import { CLIENT_ID } from '../../config/Config';
// import axiosInstance from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
// import { isAuthenticated } from './authUtils'; // Assuming you have an isAuthenticated utility function
import axiosInstance from "../../axios/mentoraxios";
import Back from "../common/back/Back";
import UserNav from "../UserNav";
import UserFooter from "../UserFooter";
import Cookies from "js-cookie";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
   const [orderIdFromBackend, setOrderIdFromBackend] = useState(null);
  const [orderID, setOrderID] = useState(false);
  const { courseId } = useParams();
  const location = useLocation();
  const { courseInfo } = location.state || {};
  const navigate = useNavigate();
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: courseInfo.price,
          },
        },
      ],
    }).then((orderID) => {
      console.log(orderID)
      setOrderID(orderID);
      console.log(orderID)
      return orderID;
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      sendDetailsToBackend(orderID, courseInfo);
    });
  };

  const sendDetailsToBackend = (orderID, courseInfo) => {
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    const userId = userDetails.id;
    console.log(userId)
    
    axiosInstance.post('storeOrder/', {
      // orderID: orderID,
      // clientID: CLIENT_ID,
      userDetails: userDetails,
      courseDetails: courseInfo,
    })
    .then((response) => {
      console.log('Order details stored on the backend:', response.data);
      const orderIdFromBackend =response.data.order.id
      console.log('Order ID from backend:', orderIdFromBackend);
      // setOrderIdFromBackend(orderIdFromBackend);
      console.log('Order successful. Your order id is--', orderIdFromBackend, CLIENT_ID);
    navigate('/ordersuccess', { state: { orderId: orderIdFromBackend } });

      
    })
    .catch((error) => {
      console.error('Error storing order details on the backend:', error);
    });
  };


  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      const orderId = navigate('/ordersuccess', { state: { orderId: orderIdFromBackend } });
      console.log('Order successful. Your order id is--', orderIdFromBackend, CLIENT_ID);
      console.log('Order successful. Your order id is--', orderIdFromBackend, CLIENT_ID);
      console.log('orderIdFromBackend:', orderIdFromBackend);
      // navigate('/ordersuccess', { state: { orderId: orderIdFromBackend } });
    }
  }, [success, orderIdFromBackend, CLIENT_ID, navigate]);
  
  return (  
    
    <>
  <UserNav />
  <Back />
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div>
        {courseId ? (
          <div className="wrapper">
            <div className="product-img">
            <h1></h1>
              <img
                src={courseInfo.thumbnail}
                alt=""
                height="320"
                width="300"
              />
            </div>
            <div className="product-info">
              <div className="product-text">
                <h1>{courseInfo.class_name}</h1>
                <p>Description: {courseInfo.course_description}</p>
                
                {/* Add more details as needed */}
              </div>
              <div className="product-price-btn">
                <p>{`$${courseInfo.price}`}</p>
                <br />
                <button
                  className='buy-btn'
                  type="submit"
                  onClick={() => setShow(true)}
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <br />
        {show ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
          </div>
        ) : null}
      </div>
    </PayPalScriptProvider>

    <UserFooter />
  </>
  );
  
        }
export default Checkout
