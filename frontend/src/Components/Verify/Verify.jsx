import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParam] = useSearchParams();
    const success = searchParam.get("success")
    const orderId = searchParam.get("orderId")

    const {backendUrl} = useContext(StoreContext);
    const navigate = useNavigate();


    const verifyPayment = async() =>{
        const response = await axios.post(backendUrl + "/api/order/verify",{success, orderId})

        if(response.data.success){
            navigate("/myOrders");


        }else{
            navigate("/")
        }
    }

    useEffect(()=> {

        verifyPayment()

    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify
