import React from "react";
import './Home.css'

function Home() {
    return (
        <div className="home">
            <p className="title">Here a system that sends fake notifications to users that were previously subscribed.</p>
            <div className="home-content">
                <h4>Users Page</h4>
                <p>List all users</p>
            </div>
            <div className="home-content">
                <h4>Message Page</h4>
                <p>Send notification messages to users by selecting a category</p>
            </div>
            <div className="home-content">
                <h4>Logs Page</h4>
                <p>All messages already sent</p>
            </div>
        </div>
    );
}

export default Home;
