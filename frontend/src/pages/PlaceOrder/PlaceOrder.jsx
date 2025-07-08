import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, backendUrl } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const navigate = useNavigate();


  const onChangeHandler = (event) =>{

    const name = event.target.name;
    const value = event.target.value;
    
    setData(data => ({
      ...data,
      [name]:value
    }))

  }

  const placeOrder  = async (event)=>{
    event.preventDefault();

    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo ["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,

    }

    let response = await axios.post(backendUrl+"/api/order/place", orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("Error")
    }

  }

  useEffect(()=>{

    if(!token){

      navigate('/cart')
      
    }else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }





  },[token])




  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">

        
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            value={data.firstname}
            onChange={onChangeHandler}
            required
          />
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            value={data.lastname}
            onChange={onChangeHandler}
            required
          />


        </div>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={onChangeHandler}
          required
        />

        <input
          name="street"
          type="text"
          placeholder="Street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />
        
        <div className="multi-fields">
          <input
            name="city"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
          
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            type="text"
            placeholder="Zip Code"
            value={data.zipcode}
            onChange={onChangeHandler}
            required
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
       
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
