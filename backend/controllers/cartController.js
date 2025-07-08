import userModel from '../models/userModel.js';




// Add item to cart
const addToCart = async (req, res) => {


    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

    

        // Check if the item already exists in the cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData: cartData },
            { new: true }
        );

        res.status(200).json({success:true, message: "Item added to cart successfully", cartData: cartData});

    }catch(error){
        console.error("Error adding item to cart:", error);
        res.status(500).json({success:false, message: "Internal server error"});
    }

}



//remove item from cart

const removeFromCart = async (req, res) => {


    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // Check if the item exists in the cart
        if (cartData[req.body.itemId] > 0) {
            // Decrease the quantity of the item in the cart
            cartData[req.body.itemId] -= 1;

            // If the quantity reaches zero, remove the item from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            // Update the user's cart data
            await userModel.findByIdAndUpdate(
                req.body.userId,
                { cartData: cartData },
                { new: true }
            );

            res.status(200).json({success:true, message: "Item removed from cart successfully", cartData: cartData});
        }
        else {
            res.status(400).json({success:false, message: "Item not found in cart"});
        }


    }
    catch(error){
        console.error("Error removing item from cart:", error);
        res.status(500).json({success:false, message: "Internal server error"});

    }

}




// Get cart items

const getCartItems = async (req, res) => {

    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.status(200).json({success:true, cartData: cartData});
    }catch(error){
        console.error("Error fetching cart items:", error);
        res.status(500).json({success:false, message: "Internal server error"});
    }
}



export { addToCart, removeFromCart, getCartItems };