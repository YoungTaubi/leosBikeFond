import React, { useEffect, useState } from 'react'
import ConfettiGenerator from "confetti-js";
import axios from 'axios';
// import SpotifyWebApi from 'spotify-web-api-node'

const HappyBirthday = () => {

    const [track, setTrack] = useState({})
    const [showAmount, setShowAmount] = useState(false)

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_PUBLIC_API_URL
    })

    const getTrack = () => {
        axiosInstance.get('api/praise-the-lord')
            .then(res => {
                console.log(res.data.body);
                setTrack(res.data.body)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        const confettiSettings = { target: 'my-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        getTrack()
    }, [])

    return (
        <>
            <div className='happyBirthdayContainer'>
                <h1>Herzlichem Glückwunsch! <br />
                    Sie hams gewonnem!
                </h1>
                <p>Wollem Sie wissen wieviel Sie gewonnem habem?</p>
                <button onClick={() => setShowAmount(!showAmount)}>Clickem Sie hier!</button>
                {
                    showAmount && 
                    <>
                    <div className="animationContainer">
                        <h1 className='animatedAmount'>666 €</h1>
                    </div>
                    <figure>
                    {/* <figcaption>{track.name}</figcaption> */}
                    <audio
                        controls autoPlay
                        src={track.preview_url}
                    >
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                </figure>
                    </>
                }

                <p>Vong diesem Leuten kommt Ihr Gewimm:</p>
                <div className="allDonationsContainer">
                    <div className="donationContainer">
                        <ul>
                            <li>Dein Muddi & Vaddi</li>
                            <li>Dein Onkel  & Tant</li>
                            <li>Elisabeth Schwarz</li>
                            <li>Angelina Vernetti</li>
                            <li>Julia Carolin Darley</li>
                            <li>Frederike Lichtenstein</li>
                            <li>Marie Hörsting</li>
                            <li>Johanna Oeppert</li>
                            <li>Maike Arendts-Yeoh</li>
                            <li>Katharin Meyer</li>
                            <li>Marie Stroka</li>
                            <li>Marina Funck</li>
                            <li>Jana Kröger</li>
                            <li>Margitta Künne</li>
                            <li>Tim Bothe</li>
                            <li>Jannik Seil</li>
                            <li>Katharina Ricarda Tritt</li>
                            <li>Luise Von Pogrell</li>
                            <li>Noelle Wichmann</li>
                            <li>Quick Constantin</li>
                            <li>Leon Rösler</li>
                            <li>Olaf Scholz</li>
                            <li>Fluppen Toni</li>
                        </ul>
                    </div>
                </div>


            </div>
            <canvas id="my-canvas" style={{ zIndex: '-5', boxSizing: 'border-box' }}></canvas>
        </>
    );
};

export default HappyBirthday;