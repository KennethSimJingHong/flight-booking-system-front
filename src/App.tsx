import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import React from 'react';
import Booking from './pages/Booking';
import History from './pages/History';
import Management from './pages/Management';
import Payment from './pages/Payment';

function App() {



  return(
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/management" element={<Management/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
