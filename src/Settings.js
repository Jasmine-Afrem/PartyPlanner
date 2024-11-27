import './Settings.css';
import React, { useState } from 'react';
import { auth } from './firebaseConfig'; // Import your Firebase configuration
import { updateProfile, updatePassword, signOut } from 'firebase/auth'; // Import Firebase functions

const Settings = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser; // Get the current user
            // Update profile with name and city
            await updateProfile(user, {
                displayName: name,
                photoURL: null // You can set a photo URL if needed
            });

            // Optionally save additional data (like age and city) to your database

            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser; // Get the current user
            await updatePassword(user, newPassword); // Update password
            setSuccess('Password updated successfully!');
            setNewPassword(''); // Clear the input
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Log the user out
            setSuccess('Successfully logged out!'); // Optional success message
        } catch (err) {
            setError(err.message); // Handle any errors
        }
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleUpdateProfile}>
                <h2>Update Profile</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <button type="submit">Update Profile</button>
            </form>

            <form onSubmit={handleChangePassword}>
                <h2>Change Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Change Password</button>
            </form>

            <button onClick={handleLogout} className="logout-button">Log Out</button> {/* Logout button */}
        </div>
    );
};

export default Settings;
