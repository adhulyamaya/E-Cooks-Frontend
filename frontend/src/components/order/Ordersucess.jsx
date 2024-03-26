// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../axios/mentoraxios';
// import UserNav from '../UserNav';
// import UserFooter from '../UserFooter';


// const Ordersuccess = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedAmPm, setSelectedAmPm] = useState('AM');
//   const [loading, setLoading] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const [orderId, setOrderId] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     setOrderId(location.state?.orderId || null);
//   }, [location.state]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleTimeChange = (event) => {
//     setSelectedTime(event.target.value);
//   };

//   const handleAmPmChange = (event) => {
//     setSelectedAmPm(event.target.value);
//   };

//   const handleBook = () => {
//     setLoading(true);
//     const bookingData = {
//       orderId: orderId,
//       selectedDate: selectedDate,
//       selectedTime: selectedTime,
//     };

//     axiosInstance
//       .post('booking/', bookingData)
//       .then((response) => {
//         console.log(response.data);
//         setConfirmed(true);
//       })
//       .catch((error) => {
//         console.error('Error booking:', error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (confirmed) {
//       setTimeout(() => {
//         navigate('/');
//       }, 5000);
//     }
//   }, [confirmed, navigate]);

//   return (
//     <>
//      <UserNav /> 
//     <div>
//       <div className="App">
//         <h1>Order ID: {orderId}</h1>
//         <p>Payment successfully completed</p>
//         <h1>BOOK YOUR TIME</h1>
        
//         <form>
//               <label>
//                 Date:
//                 <input type="date" value={selectedDate} onChange={handleDateChange} />
//               </label>
//               <br />
//               <label>
//                 Time:
//                 <input type="time" value={selectedTime} onChange={handleTimeChange} />
//                 <select value={selectedAmPm} onChange={handleAmPmChange}>
//                   <option value="AM">AM</option>
//                   <option value="PM">PM</option>
//                 </select>
//               </label>
//           <button type="button" onClick={handleBook} disabled={loading}>
//             {loading ? 'Checking Availability...' : 'Book'}
//           </button>
//         </form>
//         {confirmed ? (
//           <p>Your order has been booked! we will notify the availability details  ...</p>
//         ) : (
//           <p></p>
//         )}
//       </div>
//     </div>

//     <div style={{ margin: '' }}>
//         <UserFooter />
//       </div>
//     </>
//   );
// };

// export default Ordersuccess;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/mentoraxios';
import UserNav from '../UserNav';
import UserFooter from '../UserFooter';
import Box from '@mui/material/Box'; 

const Ordersuccess = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOrderId(location.state?.orderId || null);
  }, [location.state]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleAmPmChange = (event) => {
    setSelectedAmPm(event.target.value);
  };

  const handleBook = () => {
    setLoading(true);
    const bookingData = {
      orderId: orderId,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
    };

    axiosInstance
      .post('booking/', bookingData)
      .then((response) => {
        console.log(response.data);
        setConfirmed(true);
      })
      .catch((error) => {
        console.error('Error booking:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (confirmed) {
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }, [confirmed, navigate]);

  return (
    <>
      <UserNav />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <div className="App" style={{ textAlign: 'center' }}>
       
          <p style={{ color: 'green' }}><b>Payment successfully completed 🎉🎉🎉</b></p> 
          <br />
          <br />
          <h2>BOOK YOUR TIME</h2>
          
          <Box component="section" sx={{ p: 4, border: '1px dashed grey', width: '500px' }}>
          <h3>Order ID: {orderId}</h3>
            <form>
              <label>
                Date:
                <input type="date" value={selectedDate} onChange={handleDateChange} />
              </label>
              <br />
              <label>
                Time:
                <input type="time" value={selectedTime} onChange={handleTimeChange} />
                <select value={selectedAmPm} onChange={handleAmPmChange}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </label>
              <br />
              <button type="button" onClick={handleBook} disabled={loading}>
                {loading ? 'Checking Availability...' : 'Book'}
              </button>
            </form>
          </Box>
          
          {confirmed ? (
            <p  style={{ color: 'green' }}>Your order has been booked 👍! We will notify the availability details...</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <UserFooter />
      </div>
    </>
  );
};

export default Ordersuccess;
