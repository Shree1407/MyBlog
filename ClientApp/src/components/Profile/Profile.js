import React, { useState, useEffect } from 'react';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(Profile);
            if (!response.ok) {
                throw new Error('Failed to fetch user details.');
            }
            const data = await response.json();
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            // Handle error, show error message, etc.
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Profile Page</h2>
            {user && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Name: {user.name}</h5>
                        <p className="card-text">Email: {user.email}</p>
                        {/* Display other user details */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;