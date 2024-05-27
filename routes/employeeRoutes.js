import express from "express";
import { createEmployee, getEmployee, login, perfil, forgetPassword, changePassword } from "../controllers/employeeController.js";
import authenticate from "../middleware/authMiddleware.js";

const employeeRoutes = express.Router();

// publicas
employeeRoutes.post("/", createEmployee)
employeeRoutes.get("/", getEmployee)
employeeRoutes.post("/login", login)
employeeRoutes.post("/forget-password", forgetPassword)
employeeRoutes.post("/change-Password", changePassword)

// privada
employeeRoutes.get("/profile", authenticate, perfil)

export default employeeRoutes;