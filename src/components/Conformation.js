
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetBooking } from '../redux/bookingSlice';

export default function Confirmation() {
  const { selectedFlight, bookingDetails } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReturnHome = () => {
    dispatch(resetBooking());
    navigate('/');
  };

  return (
    <div className="confirmation" style={{ maxWidth: '500px', margin: '20px auto', textAlign: 'center' }}>
      <h2>Booking Confirmed!</h2>
      <p>Thank you for flying with Phoenix Airlines.</p>

      <div style={{ border: '1px solid #ccc', padding: '15px', textAlign: 'left', margin: '20px 0' }}>
        <h3>Passenger Information</h3>
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Email:</strong> {bookingDetails.email}</p>
        <p><strong>Phone:</strong> {bookingDetails.phone}</p>

        {selectedFlight && (
          <>
            <hr />
            <h3>Flight Details</h3>
            <p><strong>Airline:</strong> {selectedFlight.airline} ({selectedFlight.flightNumber})</p>
            <p><strong>Trip Type:</strong> {selectedFlight.tripType}</p>
            <p><strong>Route:</strong> {selectedFlight.source} → {selectedFlight.destination}</p>
            <p><strong>Departure Date:</strong> {selectedFlight.departureDate}</p>
            {selectedFlight.tripType === 'round-trip' && selectedFlight.returnDate && (
              <p><strong>Return Date:</strong> {selectedFlight.returnDate}</p>
            )}
            <p><strong>Amount Paid:</strong> ₹{selectedFlight.price}</p>
          </>
        )}
      </div>

      <button onClick={handleReturnHome}>Back to Home</button>
    </div>
  );
}
