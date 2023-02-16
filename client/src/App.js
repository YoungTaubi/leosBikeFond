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
        console.log(res);
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
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = `https://www.paypal.com/paypalme/youngTaubi/${amount}`;
            a.click();
            document.body.removeChild(a);
            {/* if (typeof window !== "undefined") {
                  window.open(`https://www.paypal.com/paypalme/youngTaubi/${amount}`, '_blank', 'noreferrer');
            } */}
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
    //  return () => confetti.clear();
  }, [showConfetti])

  return (
    <>

      <div className="App" style={{ position: 'absolute', zIndex: '1' }}>

        <div className="mainContainer">
          <h1>Leoni ihr sein Bike Fond</h1>

          <div className="allDonationsContainer">
            {allDonations.map(donation => (
              <div className="donationContainer" key={donation._id}>
                <p style={{ marginRight: '20px' }}>{donation.amount} €</p>
                <p >beigesteuert am {donation.createdAt}</p>
              </div>
            ))}
          </div>


        </div>

        <div className="makeDonationContainer">
          <h1>So viel haben wir bereits gesammelt:</h1>
          <h1>{totalDonations}€</h1>
          <p>Wieviel möchtest du beisteuern?</p>
          <form className='form' onSubmit={handleSubmit} action="submit">
            <span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />€
            </span>

            <button>Donate</button>
          </form>
          <img src={Bicycle} alt="Bicycle" />
        </div>

      </div>


      <canvas id="my-canvas" style={{ zIndex: '0', boxSizing: 'border-box' }}></canvas>


    </>
  );
}

export default App;
