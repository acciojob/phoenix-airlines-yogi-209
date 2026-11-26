import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmBooking } from '../redux/bookingSlice';

export default function FlightBooking() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const selectedFlight = useSelector((state) => state.booking.selectedFlight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = 'Name is required';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      validationErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(confirmBooking({ name, email, phone }));
    navigate('/confirmation');
  };

  return (
    <div className="flight-booking" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2>Passenger Details</h2>

      {selectedFlight && (
        <div style={{ background: '#f5f5f5', padding: '10px', marginBottom: '15px' }}>
          <p><strong>Flight:</strong> {selectedFlight.airline} ({selectedFlight.flightNumber})</p>
          <p><strong>Route:</strong> {selectedFlight.source} → {selectedFlight.destination}</p>
          <p><strong>Date:</strong> {selectedFlight.departureDate}</p>
          <p><strong>Total Fare:</strong> ₹{selectedFlight.price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error" style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error" style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error" style={{ color: 'red' }}>{errors.phone}</p>}
        </div>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
