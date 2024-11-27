import React, { useState } from 'react';
import { auth, db } from './firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './StartPlanning.css'; // Custom CSS if needed

const StartPlanning = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [budget, setBudget] = useState(''); // New budget state
    const [responsibilities, setResponsibilities] = useState(''); // New responsibilities state
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add event to Firestore
            await addDoc(collection(db, 'events'), {
                name: eventName,
                date: eventDate,
                description: eventDescription,
                budget, // Add budget to Firestore
                responsibilities, // Add responsibilities to Firestore
                userId: auth.currentUser.uid, // Link event to the user
                createdAt: new Date(),
            });

            // Clear the form
            setEventName('');
            setEventDate('');
            setEventDescription('');
            setBudget('');
            setResponsibilities('');
            setSuccess('Event created successfully!');
            setError('');

            // Redirect to Party Planner
            navigate('/party-planner'); // Navigate to Party Planner after success
        } catch (err) {
            setError('Failed to create event: ' + err.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="text-center mb-4">Start Planning Your Event</h2>
            <form className="event-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Event Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="3" // Make the textarea smaller
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Budget</label>
                    <input
                        type="number"
                        className="form-control"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Responsibilities</label>
                    <textarea
                        className="form-control"
                        rows="3" // Make the textarea smaller
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#c548f7', borderColor: '#c548f7' }}>Create Event</button>

                {success && <p className="text-success mt-3">{success}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
            </form>
        </div>
    );
};

export default StartPlanning;
