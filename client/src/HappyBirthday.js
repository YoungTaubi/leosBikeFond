import React, { useEffect, useState } from 'react'
import ConfettiGenerator from "confetti-js";
import axios from 'axios';
// import SpotifyWebApi from 'spotify-web-api-node'

const HappyBirthday = () => {

    const [track, setTrack] = useState({})

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

    // const spotifyApi = new SpotifyWebApi({
    //     clientId: process.env.REACT_APP_CLIENT_ID,
    //     clientSecret: process.env.REACT_APP_CLIENT_SECRET
    // });

    // console.log(spotifyApi);

    // // Retrieve an access token
    // spotifyApi
    //     .clientCredentialsGrant()
    //     .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    //     .catch(error => console.log('Something went wrong when retrieving an access token', error));

    // spotifyApi.getTrack('7jQkiAaa4XYYsPH3rcfcWo')
    // .then(track => {
    //     console.log(track);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    useEffect(() => {
        const confettiSettings = { target: 'my-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        getTrack()

    }, [])

    return (
        <div>
            <h1>Herzlichem Glückwunsch! <br />
                Sie hams gewonnem!
            </h1>
            <p>Wollem Sie wissen wieviel Sie gewonnem habem?</p>
            <button>Ckickem Sie hier!</button>
            <div className="animationContainer">
                <h1 className='animatedAmount'>666 €</h1>
            </div>
            <figure>
                <figcaption>{track.name}</figcaption>
                <audio
                    controls autoplay loop
                    src={track.preview_url}
                    >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </figure>
            <canvas id="my-canvas" style={{ zIndex: '0', boxSizing: 'border-box' }}></canvas>
        </div>
    );
};

export default HappyBirthday;