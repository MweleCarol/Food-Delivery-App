import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext.jsx';
import axios from 'axios';



const LoginPopup = ({setShowLogin}) => {

  const {backendUrl, token, setToken} = useContext(StoreContext);

    const[currentState,setCurrentstate] = useState("Login");
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });



  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({
        ...data,
        [name]: value
      }));
      
  }

  const onLogin = async (event) => {
  event.preventDefault();

  let newbackendUrl = backendUrl;

  if (currentState === "Login") {
    newbackendUrl += "/api/user/login";
  } else {
    newbackendUrl += "/api/user/register";
  }

  try {
    const response = await axios.post(newbackendUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Login/Register request failed:", error);
    if (error.response) {
      alert(error.response.data.message || "An error occurred during login/register.");
    } else {
      alert("Network error. Check your server.");
    }
  }
};



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currentState === "Login" ? <></>: <input name='name' onChange={onChangeHandler} type="text"  placeholder='Your name' value={data.name} required/>}
            <input name='email' onChange={onChangeHandler} type="email"  placeholder='Your email' value={data.email} required/>
            <input name='password' onChange={onChangeHandler} type="password"  placeholder='Password' value={data.password} required/>
        </div>
        <button>{currentState === "Sign Up" ? "Create account": "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login"
         ? <p>Create a new account? <span onClick={() => setCurrentstate("Sign Up")}>Click here</span></p>
         :<p>Already have an account? <span onClick={() => setCurrentstate("Login")}>Click here</span></p>
         }
      </form>
    </div>
  );
}

export default LoginPopup;
