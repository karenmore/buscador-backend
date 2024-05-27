import express from 'express';
import { getRoles, createRole } from '../controllers/roleController.js';

const roleRoutes = express.Router();

roleRoutes.get('/', getRoles);
roleRoutes.post('/', createRole);

export default roleRoutes;