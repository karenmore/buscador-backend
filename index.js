import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import activeRoutes from "./routes/activeRoutes.js";
//import { cloudinary } from './cloudinary.js';

// Aquí puedes usar el objeto `cloudinary` sin problemas



const app = express();
app.use(express.json())

dotenv.config()


conectarDB()
const dominiosPermitidos = [process.env.FRONTEND_UR]

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // el origine del reques esta permitido
            callback(null, true)
        }else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));


app.use('/api/products', productRoutes)
app.use('/api/caterory', categoryRoutes)

app.use('/api/employee', employeeRoutes)
app.use('/api/roles', roleRoutes);
app.use('/api/activos', activeRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando por el puerto ${PORT}`)
});