import express from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js"
import upload from "../utils/multer.js";
import authenticate from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

productRoutes.route('/')
    .post(upload.single('image'), createProduct)
    .get(getProducts)

productRoutes.route('/:id')
    .put(authenticate, updateProduct)
    .delete(authenticate, deleteProduct)

//.post(upload.single('image'), createProduct)
/*router.post('/', upload.single('image'), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)*/

export default productRoutes;