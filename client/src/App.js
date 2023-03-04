import './App.css';
import { Routes, Route } from 'react-router-dom';
import HappyBirthday from './HappyBirthday'
import Donations from './Donations';


function App() {

  return (
    <>
      <Routes>
        <Route path='/happy-birthday' element={
          <HappyBirthday />
        } />
        <Route path='/' element={
          <Donations />
        } />
      </Routes>
    </>
  );
}

export default App;
