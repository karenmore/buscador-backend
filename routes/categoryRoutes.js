import express from 'express';
import { createCategory, getCategory } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getCategory)

export default categoryRoutes;