import { Route, Routes } from 'react-router-dom';
import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react'

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState('null');

  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    },1500);
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#212529';
      showAlert(" :- Dark mode has been enabled","success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert(" :- Light mode has been enabled","success");
    }
  }
  
  return (
    <>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert}/>
      <div className="container my-3">

        <Routes>
          <Route path='/' element={<TextForm showAlert={showAlert} heading="Enter your text below :-" mode={mode}/>} />
          <Route path='/about' element={<About mode={mode}/>} />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
