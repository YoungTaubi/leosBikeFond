import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


function App() {

  const [totalDonations, setTotalDonations] = useState('');

  const getTotalDonations = () => {
    axios.get('api/')
      .then(res => {
        console.log(res);
        setTotalDonations(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTotalDonations()
  }, [])

  return (
    <div className="App">
    <h1>Donations</h1>
      {totalDonations}
    </div>
  );
}

export default App;
