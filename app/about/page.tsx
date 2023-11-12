import React from 'react';
import Image from 'next/image';
import './AboutUs.css'; // Import your CSS file

const AboutUs = () => {
    return (
        <div className="container">
            <header>
                <h1>About Us</h1>
            </header>
            <section className="about-content">
                <p>Welcome to our Indoor Farm Monitoring System!</p>
                <p>
                    At Indoor Farms Co., we are passionate about leveraging technology to
                    revolutionize agriculture. Our monitoring system provides real-time data
                    and insights into the conditions of your indoor farm, allowing you to
                    optimize crop growth and maximize yields.
                </p>
                <p>
                    Whether you are a seasoned farmer or new to indoor farming, our goal is to
                    empower you with the tools and information needed to make informed
                    decisions for a successful harvest.
                </p>
            </section>
            <section className="key-features">
                <h2>Key Features:</h2>
                <ul>
                    <li>Real-time environmental monitoring</li>
                    <li>Automated alerts for critical conditions</li>
                    <li>Data analytics for crop performance</li>
                    <li>User-friendly interface for easy navigation</li>
                </ul>
            </section>
            <section className="thank-you">
                <p>
                    Thank you for choosing Indoor Farms Co. for your indoor farming needs. We
                    are committed to supporting you on your journey to sustainable and
                    efficient agriculture.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
