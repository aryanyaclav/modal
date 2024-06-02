import React, { forwardRef, useState } from 'react'
import './Form.css'

let Form = forwardRef(({onClose}, ref) => {
    console.log(ref.current)
    console.log(onClose)
    let [formData, setFormData] = useState({
        'username':'',
        'email':'',
        'phone':'',
        'dob':''
    })

    let [error, setError] = useState('')
    let validateDate = (date) => {
        let todaysDate = new Date()
        let selectedDate = new Date(date)

        if(selectedDate > todaysDate){
            return false
        }

        return true
    }

    let validateData = () => {
        if(!formData.email.includes("@")){
            setError(`Please include an '@' in the email address.${formData.email} is missing an '@`)
            window.alert("Invalid email. Please check your email address.")
            return false
        }
        if(formData.phone.length !== 10){
            window.alert("Invalid phone number. Please enter a 10-digit phone number.")
            return false
        }
        if(!validateDate(formData.dob)){
            window.alert(`Invalid date of birth. date of birth cannot be in future.`)
            return false
        }

        return true
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if(validateData()){
            console.log("form submitted")
            onClose()
        }
        
    }

    let handleChange = (e) => {
        setError('')
        let {name, value} = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
  return (
    <div className='modal-content' >
        <form onSubmit={handleSubmit} ref={ref}>
            <h2>Fill Details</h2>
            <label>Username:</label><input id="username" type="text" name="username" value={formData.username} onChange={handleChange} required/>
            <label>Email Address:</label><input id="email" type="text" name="email" value={formData.email} onChange={handleChange} required/>
            { error.length > 0 ? <div>{error}</div> : ''}
            <label>Phone Number:</label><input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} required/>
            <label>Date of Birth:</label><input id="dob" type="date" name="dob" value={formData.dob} onChange={handleChange} required/>
            <button className="submit-button" type="submit">Submit</button>
        </form>
    </div>
  )
})

export default Form;
