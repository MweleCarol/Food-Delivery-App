import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import { subtle } from "crypto";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing an order for the frontend
export const placeOrder = async (req, res) => {

    const frontendUrl = "http://localhost:5174";

    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await newOrder.save()

        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})


        const line_items = req.body.items.map((item) => (
            {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100
                },
                quantity:item.quantity

            }
        ))

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.json({
            success:true,
            session_url:session.url
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Error in placing Order"
    });
    }


}


export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  console.log("Received Verify request", {orderId, success})

  try {
    const order = await orderModel.findById(orderId);
    console.log("Order found", order)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // If payment is already confirmed
    if (order.payment === true) {
        console.log("Order already paid")
      return res.json({
        success: true,
        message: "Payment already verified",
      });
    }

    if (success === "true") {
      order.payment = true;
      await order.save();
        console.log("Payment confirmed")
      return res.json({
        success: true,
        message: "Payment confirmed",
      });
    } else {
        console.log("Payment failed  deleting order" )
      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        message: "Payment failed. Order deleted.",
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during verification",
    });
  }
};


//user order for frontend
export const userOrders = async(req, res) => {

  try{

    const orders = await orderModel.find({userId:req.body.userId})

    res.json({
      success:true,
      data:orders
    })

  }
  catch(error){
    console.log("Errors", error)
    res.json({
      success:false,
      message:"Error occurred in the fetching "
    })

  }



};

//list the order for the admin panel
export const listOrders = async (req, res) => {


  try{
    const orders = await orderModel.find({})
    res.json({
      success:true,
      data:orders
    })

  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
      message:"Error"
    })
s
  }
}
//api for updating the order status 
export const updateStatus = async (req, res) => {


  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

    res.json({
      success:true,
      message:"Status Updated"
    })

  }catch(error){

    console.error(error)
    res.json({
      success:true,
      message:"Error in updating the status"
    })
  }

}

