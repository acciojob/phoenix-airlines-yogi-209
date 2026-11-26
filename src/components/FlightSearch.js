import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchParams, selectFlight } from '../redux/bookingSlice';

const MOCK_FLIGHTS = [
  { id: 1, airline: 'Phoenix Airlines', flightNumber: 'PA-101', source: 'Delhi', destination: 'Mumbai', departureTime: '08:00 AM', arrivalTime: '10:15 AM', price: 4500 },
  { id: 2, airline: 'Phoenix Airlines', flightNumber: 'PA-204', source: 'Delhi', destination: 'Mumbai', departureTime: '02:30 PM', arrivalTime: '04:45 PM', price: 5200 },
  { id: 3, airline: 'Phoenix Airlines', flightNumber: 'PA-305', source: 'Mumbai', destination: 'Bangalore', departureTime: '09:15 AM', arrivalTime: '11:00 AM', price: 3800 },
  { id: 4, airline: 'Phoenix Airlines', flightNumber: 'PA-412', source: 'Bangalore', destination: 'Delhi', departureTime: '06:00 PM', arrivalTime: '08:45 PM', price: 6100 },
  { id: 5, airline: 'Phoenix Airlines', flightNumber: 'PA-509', source: 'Mumbai', destination: 'Delhi', departureTime: '07:00 AM', arrivalTime: '09:15 AM', price: 4700 },
];

export default function FlightSearch() {
  const [tripType, setTripType] = useState('one-way');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!source.trim() || !destination.trim() || !departureDate) {
      setError('Please enter source, destination, and departure date.');
      return;
    }
    if (source.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setError('Source and destination cities cannot be the same.');
      return;
    }
    if (tripType === 'round-trip' && !returnDate) {
      setError('Please select a return date for round-trip bookings.');
      return;
    }

    dispatch(setSearchParams({ tripType, source, destination, departureDate, returnDate }));

    const matched = MOCK_FLIGHTS.filter(
      (f) =>
        f.source.toLowerCase().includes(source.trim().toLowerCase()) &&
        f.destination.toLowerCase().includes(destination.trim().toLowerCase())
    );

    const finalResults =
      matched.length > 0
        ? matched
        : [
            {
              id: Date.now(),
              airline: 'Phoenix Airlines',
              flightNumber: 'PA-707',
              source: source.trim(),
              destination: destination.trim(),
              departureTime: '10:00 AM',
              arrivalTime: '12:30 PM',
              price: 4999,
            },
          ];

    setResults(finalResults);
    setSearched(true);
  };

  const handleBook = (flight) => {
    dispatch(selectFlight({ ...flight, tripType, departureDate, returnDate }));
    navigate('/flight-booking');
  };

  return (
    <div className="flight-search" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>Search Flights</h2>

      <form onSubmit={handleSearch}>
        <div>
          <label>
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === 'one-way'}
              onChange={() => setTripType('one-way')}
            />
            One-way
          </label>
          <label style={{ marginLeft: '15px' }}>
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === 'round-trip'}
              onChange={() => setTripType('round-trip')}
            />
            Round-trip
          </label>
        </div>

        <div>
          <input
            type="text"
            placeholder="Source City"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Destination City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div>
          <label>Departure Date: </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {tripType === 'round-trip' && (
          <div>
            <label>Return Date: </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Search Flights</button>
      </form>

      {searched && (
        <div className="flight-results" style={{ marginTop: '20px' }}>
          <h3>Available Flights</h3>
          {results.map((flight) => (
            <div
              key={flight.id}
              style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}
            >
              <h4>{flight.airline} ({flight.flightNumber})</h4>
              <p>{flight.source} → {flight.destination}</p>
              <p>{flight.departureTime} - {flight.arrivalTime}</p>
              <p>Price: ₹{flight.price}</p>
              <button
                className="book-flight"
                onClick={() => handleBook(flight)}
              >
                Book Flight
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
