import Category from "../models/Category.js";
import mongoose from 'mongoose';

const createCategory = async(req, res) => {

        const { name, description, categorId, order, status } = req.body;

        try{
            if(!name || !description || !categorId || !order || !status){
                return res.status(400).json({msg: "Debes proporcionar todos los datos de la cateroria"})
            };
            const caterory = await Category({name, description, categorId, order, status});
            const caterorySaved = await caterory.save();
    
            res.status(201).json(caterorySaved);
        }catch(error){
            console.log(error);
            res.status(500).json({msg: "Error al crear la cateroria"})
        }
};

const getCategory =  async(req, res) => {
    try{
        const category = await Category.find();
        res.json(category);
    }catch(error){
        console.log(error)
        res.status(500).json({mgs: "Error al consultar las caterogias."})
    }
};


export {
    createCategory,
    getCategory
}