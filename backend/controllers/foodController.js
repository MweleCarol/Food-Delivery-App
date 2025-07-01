import foodModel from "../models/foodModel.js";

import fs from 'fs'


//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    console.log("Form body",req.body);


    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename
    })


    

    try {
    const savedFood = await food.save();
    console.log("Uploaded file:", req.file);
    console.log("Saved to DB:", savedFood); // Add this!

    res.status(201).json({ success: true, message: "Food Added", food: savedFood });
    } catch (error) {
        console.log("Error saving food:", error); // More helpful
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }



}

//all food list
const listFood = async (req,res)=> {
    try {

        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods

        })

    } catch(error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error in Listing"
            
        })

    }

}


//remove food item
const removeFood = async (req, res) => {

    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=> {})

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success:true,
            message:"Food removed"
        })



    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Error in deletion"
        })

    }

}

export {addFood, listFood, removeFood}