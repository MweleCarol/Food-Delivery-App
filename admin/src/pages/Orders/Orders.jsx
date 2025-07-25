import React from 'react'
import "./Orders.css"
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({backendUrl}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    const response = await  axios.get(backendUrl+"/api/order/list");

    if(response.data.success){
      setOrders(response.data.data)
      
    }else{
      toast.error("Error in fetching Data")

    }


  }


  const statusHandler = async (event, orderId) =>{

    const response = await axios.post(backendUrl+"/api/order/status", {
    orderId,
    status:event.target.value})

    if(response.data.success){

    fetchAllOrders()
    
    }



  }



  useEffect(()=> {
    fetchAllOrders()
  })

  return (
  <div className='order add'>
    <h3>Order Page</h3>

    <div className="order-list">
      {
        orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className='order-item-food'>
                {
                  order.items.map((item) => 
                    `${item.name} x ${item.quantity}`
                  ).join(", ")
                }
              </p>
              <p className="order-item-name">
                {order.address.firstname+ " " +order.address.lastname}
              </p>
              <div className="order-item-address">
                 <p>
                {order.address.street+","}
              </p>
               <p>
                {order.address.city+","+order.address.state+","+order.address.country+", "+order.address.zipcode}
              </p>
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
             
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=> statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))
      }
    </div>
  </div>
)


}

export default Orders
