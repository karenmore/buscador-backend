import express from 'express';
import { getActivos, createActivo } from '../controllers/activoController.js';

const activeRoutes = express.Router();

activeRoutes.get('/', getActivos);
activeRoutes.post('/', createActivo);

export default activeRoutes;