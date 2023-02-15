import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import ConfettiGenerator from "confetti-js";
import party from "party-js";
import Bicycle from './bicycle.svg';


function App() {

  const [allDonations, setAllDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0)
  const [amount, setAmount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL
  })

  const getAllDonations = () => {
    axiosInstance.get('api/donations')
      .then(res => {
        const calculateTotalDonations = res.data.reduce((a, b) => {
          return a + Number(b.amount)
        }, 0)
        const formatDate = res.data.map(donation => {
          donation.createdAt = donation.createdAt.substring(0, 10).split('-').reverse().join('.')
          return donation
        })
        setTotalDonations(calculateTotalDonations)
        setAllDonations(formatDate)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount <= 0) {
      alert('Please add amount')
    } else {
      axiosInstance.post('api/make-donation', { amount })
        .then(res => {
          setShowConfetti(true)
          party.confetti(e.target, {
            count: party.variation.range(20, 40),
          });
          setAmount(0)
          getAllDonations()
          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.open('https://google.com', '_blank', 'noreferrer');
            }
          }, 3000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    getAllDonations()

    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    if (showConfetti) {
      confetti.render();
    }
    // return () => confetti.clear();
  }, [showConfetti])

  return (
    <>

      <div className="App" style={{ position: 'absolute', zIndex: '11' }}>

        <h1>Donations</h1>
        {totalDonations}
        <div className="allDonationsContainer">
          {allDonations.map(donation => (
            <div key={donation._id}>
              <p >{donation.amount}</p>
              <p >{donation.createdAt}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} action="submit">
          <span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />€
          </span>

          <button>Donate</button>
        </form>
      </div>
      
      <canvas id="my-canvas" style={{ zIndex: '10' }}>test</canvas>
      <img src={Bicycle} alt="Bicycle" />

    </>
  );
}

export default App;
