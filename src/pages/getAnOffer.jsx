import React from 'react';
import './pages.css';

export default function getAnOffer() {
    return (
        <div className="getAnOffer">
            <h1>Get An Offer</h1>
            <p>Get an offer for your project</p>
            <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Project Description" />
                <button type="submit">Get Offer</button>
            </form>
        </div>
    )

}