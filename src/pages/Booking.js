import React, { useState } from 'react';
import Header from '../components/Header';
import '../pages/authStyles.css';

const Booking = () => {
  const [fullName, setFullName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!fullName || !doctor || !date || !time) {
      setMessage('Please fill in all fields');
      return;
    }

    
    setMessage('Your appointment is booked!');

    
    setFullName('');
    setDoctor('');
    setDate('');
    setTime('');
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <div className="form-card">
          <h2>🩺 Book an Appointment</h2>
          {message && <div className="success-message">{message}</div>}
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label>Doctor</label>
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
              <option value="">Select a doctor</option>
              <option value="dr_riya">Dr. Riya</option>
              <option value="dr_amir">Dr. Amir</option>
              <option value="dr_arjun">Dr. Arjun</option>
              <option value="dr_mishra">Dr. Mishra</option>
              <option value="dr_ankit">Dr. Ankit</option>
              <option value="dr_saad">Dr. Saad</option>
            </select>

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button type="submit">Book Appointment</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
