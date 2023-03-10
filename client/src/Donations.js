import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ConfettiGenerator from "confetti-js";
import party from "party-js";
import Bicycle from './bicycle.svg';
import LoadingAnimation from './Rolling-1s-200px.svg';
import { Routes, Route } from 'react-router-dom';
import HappyBirthday from './HappyBirthday'


function Donations() {

  const [allDonations, setAllDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0)
  const [amount, setAmount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true)
  const [outOfOrderModal, setOutOfOrderModal] = useState(false)


  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_URL
  })

  const getAllDonations = () => {
    console.log('getting donations');
    setTimeout(() => {
      if (showLoadingAnimation) {
        setOutOfOrderModal(true)
      }
    }, 40000)
    axiosInstance.get('api/donations')
      .then(res => {
        console.log(res);
        setShowLoadingAnimation(false)
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
    console.log('click');
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

  const showAllAnimations = () => {
    const donationsList = allDonations.map(donation => (
      <div className="donationContainer" key={donation._id}>
        <p style={{ marginRight: '20px' }}>{donation.amount} ???</p>
        <p >beigesteuert am {donation.createdAt}</p>
      </div>
    ))
    return donationsList
  }

  useEffect(() => {
    getAllDonations()
  }, [])

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
        {/* {outOfOrderModal &&
          <div className="outOfOrderModalContainer">
            <div className="messageContainer">
              <p>Sorry! Es scheint so als w??re der Server momentan down. Bitte probiere es sp??ter nochmal.</p>
            </div>
          </div>
        } */}
        <div className="mainContainer">
          <h1>Leoni ihr sein Bike Fond</h1>

          <div className="allDonationsContainer">
            {showLoadingAnimation ?
              <img style={{ width: '200px' }} className='loadingAnimation' src={LoadingAnimation} alt="Loading Animation" />
              :
              showAllAnimations()
            }
          </div>
        </div>

        <div className="makeDonationContainer">
          <h1>So viel haben wir bereits gesammelt:</h1>
          {showLoadingAnimation ?
            <img style={{ width: '100px' }} className='loadingAnimation' src={LoadingAnimation} alt="Loading Animation" />
            :
            <h1>{totalDonations}???</h1>
          }

          <p>Wieviel m??chtest du beisteuern?</p>
          <form className='form' onSubmit={handleSubmit} action="submit">
            <span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />???
            </span>

            <button>Donate</button>
          </form>
          <img className='bicycleImage' src={Bicycle} alt="Bicycle" />
        </div>

      </div>


      <canvas id="my-canvas" style={{ zIndex: '0', boxSizing: 'border-box' }}></canvas>
      

    </>
  );
}

export default Donations;
