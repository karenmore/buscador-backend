import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

const authenticate = async (req, res, next) => {

    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.employee = await Employee.findById(decoded.id).select("-password"

            );
            return next();

        }catch(error){
            const e = new Error("Token no valido")
            return res.status(403).json({msg: e.message})
        }
    }
    if(!token){
        const error = new Error("Token no valido")
        res.status(403).json({msg: error.message})
    }

    next()
    /*let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try{
            token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)

            const employee = await Employee.findById(decoded.id);
            console.log(employee)
        }catch (error) {
            const e = new Error("Token no valido")
            res.status(403).json({msg: e.message})

        }
    }
    const error = new Error("Token no valido o inexistente");
    res.status(403).json({msg: error.message})
    
    next()*/

}

export default authenticate

/*const authenticate = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verificar si el usuario tiene el rol permitido
      if (allowedRoles.includes(decoded.role)) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({ msg: "No tienes permiso para acceder a esta ruta" });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: "Token inválido" });
    }
  };
};

export default authenticate;*/
