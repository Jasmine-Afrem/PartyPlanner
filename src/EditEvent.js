// src/EditEvent.js
//import './EditEvent.css'; // Add your CSS file
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from './firebaseConfig'; // Import auth and db
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions

const EditEvent = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Access the passed location state
    const event = location.state?.event; // Get the event data from location state

    const [eventName, setEventName] = useState(event ? event.name : '');
    const [eventDate, setEventDate] = useState(event ? event.date : '');
    const [eventDescription, setEventDescription] = useState(event ? event.description : '');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventName || !eventDate || !eventDescription) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Update the existing event document in Firestore
            const user = auth.currentUser; // Get the currently logged-in user
            const eventRef = doc(db, 'events', event.id); // Reference to the specific event document

            await updateDoc(eventRef, {
                name: eventName,
                date: eventDate,
                description: eventDescription,
                userId: user.uid, // Ensure the user's UID is maintained
            });

            // Navigate back to PartyPlanner after updating
            navigate('/party-planner');
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    // Redirect if no event is provided
    useEffect(() => {
        if (!event) {
            navigate('/party-planner'); // Redirect if no event found in state
        }
    }, [event, navigate]);

    return (
        <div className="edit-event-container">
            <h1>Edit Event</h1>
            <form className="event-form" onSubmit={handleSubmit}>
                <label htmlFor="event-name">Event Name:</label>
                <input
                    type="text"
                    id="event-name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />

                <label htmlFor="event-date">Event Date:</label>
                <input
                    type="date"
                    id="event-date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />

                <label htmlFor="event-description">Description:</label>
                <textarea
                    id="event-description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                />

                <button type="submit" className="submit-button">Confirm Changes</button>
            </form>
        </div>
    );
};

export default EditEvent;
