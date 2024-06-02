import logo from './logo.svg';
import './App.css';
import Form from './Form';
import { useEffect, useRef, useState } from 'react';

function App() {
  let [openForm, setOpenform] = useState(false)
  let formRef = useRef(null)

  let handleOpenForm = () => {
    setOpenform(true)
  }

  let handleCloseForm = () => {
    setOpenform(false)
  }

  const handleClickOutside = (event) => {
    console.log(formRef.current)
    console.log(openForm)
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleCloseForm();
    }
  };

  useEffect(() => {
    if(openForm){
      document.getElementById("main").addEventListener('click', handleClickOutside)
      console.log(window)
    }else{
      document.getElementById("main").removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.getElementById("main").removeEventListener('click', handleClickOutside)
    }
  }, [openForm])

  
  return (
    <div id="main" className={`modal ${openForm ? 'modal-open' : ''}`}>
    <div className="header-container">
    <h1>User Details Form</h1>
      <button onClick={handleOpenForm}>Open Form</button>
    </div>
    { openForm ? <Form ref={formRef} onClose={handleCloseForm}/> : ''}
      
    </div>
  );
}

export default App;
