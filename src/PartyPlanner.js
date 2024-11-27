// src/PartyPlanner.js
import './PartyPlanner.css'; 
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebaseConfig'; // Import the auth and db instances
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'; // Firestore methods to retrieve events

const PartyPlanner = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [events, setEvents] = useState([]); // State to hold user's events

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
                fetchEvents(user.uid); // Fetch events when the user is logged in
            } else {
                setUserEmail('');
                setEvents([]); // Clear events if the user is not logged in
                navigate('/login'); // Redirect to login if not authenticated
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribeAuth();
    }, [navigate]);

    // Fetch events for the current user
    const fetchEvents = (userId) => {
        const eventsRef = collection(db, 'events'); // Reference to the events collection
        const q = query(eventsRef, where('userId', '==', userId)); // Query to get events for the current user

        // Subscribe to real-time updates from Firestore
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userEvents = [];
            querySnapshot.forEach((doc) => {
                userEvents.push({ id: doc.id, ...doc.data() });
            });
            setEvents(userEvents); // Update state with fetched events
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    };

    // Navigate to the edit page for a specific event
    const handleEditEvent = (event) => {
        navigate('/edit-event', { state: { event } }); // Pass the whole event object to EditEvent
    };

    // Handle deleting an event
    const handleDeleteEvent = async (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                const eventRef = doc(db, 'events', eventId); // Reference to the specific event document
                await deleteDoc(eventRef); // Delete the document
                alert("Event deleted successfully."); // Optional: alert for success
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleStartPlanning = () => {
        navigate('/start-planning');
    };

    const handleJoinParty = () => {
        navigate('/join-party');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    return (
        <div className="party-planner-container">
            <div className="party-box">
                <h1>Welcome to Party Planner, {userEmail || 'Guest'}!</h1>
                <p>What would you like to do?</p>
                <div className="menu">
                    <button onClick={handleStartPlanning} className="menu-button">Start Planning</button>
                    <button onClick={handleJoinParty} className="menu-button">Join Existing Party</button>
                    <button onClick={handleSettings} className="menu-button">Settings</button>
                </div>
            </div>

            <div className="events-box">
                <h2>My Events</h2>
                {events.length > 0 ? (
                    <ul className="events-list">
                        {events.map(event => (
                            <li key={event.id} className={`event-item ${event.deleted ? 'fade-out' : ''}`}>
                                <span>{event.name}</span>
                                <span>{event.date}</span> {/* Display event date */}
                                <span>{event.description}</span> {/* Display event description */}
                                <div className="event-buttons">
                                    <button onClick={() => handleEditEvent(event)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDeleteEvent(event.id)} className="delete-button">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-events-message">You don't have events yet</p>
                )}
            </div>
        </div>
    );
};

export default PartyPlanner;
