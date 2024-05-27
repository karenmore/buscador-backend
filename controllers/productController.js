import Category from "../models/Category.js";
import Product from "../models/Product.js"
//import mongoose from "mongoose";
//import cloudinary from "../utils/cloudinary.js";
//const { uploadToCloudinary, deleteFromCloudinary } = cloudinary;
//import { uploadToCloudinary } from "../utils/cloudinary.js";


/*const createProduct = async (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha proporcionado un archivo de imagen' });
    }

    try {
        const { url } = await uploadToCloudinary(req.file);
        return res.status(201).json({
            message: "Prueba de la imagne",
            url: url
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary' });
    }

    /*try {
        const uploadResult = await uploadToCloudinary(req.file);
        const { secure_url } = uploadResult;

        return res.status(201).json({
            message: "Subiendo la imagen",
            url: secure_url
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al subir la imagen' });
    }*/
    /*try {
      const { name, description, activeIngredient } = req.body;
      const imageUrl = req.file.path; // URL de la imagen en Cloudinary
  
      const newProduct = new Product({
        name,
        description,
        activeIngredient,
        image: imageUrl, // Guardas la URL de la imagen en la base de datos
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };*/

const createProduct = async (req, res) => {
    //return res.status(201).json({message: "Creando Imagen"})
    const { name, description, activeIngredient, imageUrl, item , upc, categorId} = req.body;

    try {
        if (!name || !description || !activeIngredient || !imageUrl ||  isNaN(item) || isNaN(upc) || isNaN(categorId)) {
          return res.status(400).json({ msg: 'Debes proporcionar todos los datos del producto' });
        }

        // Buscar la categoría correspondiente por el campo categorId
        const category = await Category.findOne({ categorId: parseInt(categorId) });

        if (!category) {
            return res.status(404).json({ msg: "Categoría no encontrada" });
          }

        const product = await Product({
            name,
            description,
            activeIngredient,
            imageUrl,
            item: parseInt(item),
            upc: parseInt(upc),
            categorId: parseInt(categorId)
          });

        await product.save();

        res.status(201).json(product);
    }catch(error){
        res.status(500).json({msg: "Error al crear el producto"})
    }
}

const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      // Obtener los IDs de categoría únicos
      const categoryIds = [...new Set(products.map(product => product.categorId))];
  
      // Buscar las categorías por sus IDs
      const categories = await Category.find({ categorId: { $in: categoryIds } });
  
      // Asociar cada producto con su categoría correspondiente
      const productsWithCategories = products.map(product => {
        const category = categories.find(c => c.categorId === product.categorId);
        return { ...product.toObject(), categorId: category };
      });
  
      res.json(productsWithCategories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
  
  
  

const getProductById = async(req, res) => {
    const { id } = req.params;
    try{
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({msg: "Producto no encontrado"})
        }
        res.json(product)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}

const updateProduct = async(req, res) => {
    const {id} = req.params;
    const { name, description, activeIngredient } = req.body;

    try{
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({msg: "Producto no encontrado"})
        }
        if(!name || !description || !activeIngredient){
            return res.status(400).json({msg: "Debes proporcionar todos los datos del producto"});
        }

        product.name = name;
        product.description = description;
        product.activeIngredient = activeIngredient;

        const productUpdate = await product.save();
        res.json(productUpdate)

    }catch(error){
        res.status(500).json({msg: "Error al actualizar el producto"})
    }


    }

const deleteProduct = async(req, res) => {
    const { id } = req.params;

    try{
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({msg: "Producto no encontrado"});
        }
        await product.deleteOne();
        res.json(product)
    }catch(error){
        console.log(error);
        res.status(500).json({mgs: "Error el eliminar el producto"})

    }
}

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}