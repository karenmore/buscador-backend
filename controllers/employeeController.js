import Employee from "../models/Employee.js";
import Role from "../models/Role.js"
import Activo from "../models/Activo.js"
import genericJWT from "../helpers/genericJWT.js";

const createEmployee = async (req, res) => {
    const {name,  lastname, employeeNumber, 
        password} = req.body;

    const existeUser = await Employee.findOne({employeeNumber});
    if(existeUser) {
        return res.status(404).json({msg: "El regostro ya existe"})
    }
    
    try{
        if(!name || !lastname || !password){
            return res.status(400).json({msg: "Debes proporcionar todos los datos para completar el registro"})
        };
        
        // Buscar el documento de Role correspondiente al valor de role enviado
   /* const roleDoc = await Role.findOne({ value: role });
    if (!roleDoc) {
      return res.status(400).json({ msg: "Rol inválido" });
    }

    // Buscar el documento de Active correspondiente al valor de Active enviado
    const activoDoc = await Activo.findOne({ value: parseInt(activo) });
    if (!activoDoc) {
      return res.status(400).json({ msg: "Estado inválido" });
    }*/

        const employee = await Employee({
            name,  
            lastname, 
            employeeNumber, 
            password});
        const employeesaved = await employee.save();
    
        res.status(201).json(employeesaved);
        
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Error al registrar el empleado"})
    }
};

const getEmployee =  async(req, res) => {
    try{
        const employee = await Employee.find();
        res.json(employee);
    }catch(error){
        console.log(error)
        res.status(500).json({mgs: "Error al obtener los empleados."})
    }
};

const login = async(req, res) => {

    const { employeeNumber, password } = req.body

    // Validando si existe
    const employee = await Employee.findOne({employeeNumber: parseInt(employeeNumber)})

    if(!employee) {
        return res.status(403).json({msg: "El usuario no existe"})
    }

    // Autenticar
    if( await employee.isValide(password)){

        res.json({
            _id: employee.id,
            name: employee.name,
            lastname: employee.lastname,
            employeeNumber: employeeNumber.employeeNumber,
            role: employee.role,
            token: genericJWT(employee.id),

        })
    }else {
        return res.status(403).json({msg: "Contraseña inválida"})
    }
}

const perfil = (req, res) => {

    const { employee } = req;
    res.json(employee)
};

const forgetPassword = async(req, res) => {
    const {employeeNumber} = req.body;

    try{
        const employee = await Employee.findOne({employeeNumber})
        if(!employee){
            const error = new Error("El usuario no existe")
            return res.status(400).json({msg: error.message})
        }
        return res.json({msg: "ingrese una nueva contraseña"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg: "Error al buscar el empleado"});
    }
};

const changePassword = async (req, res) => {
    const { employeeNumber, newPassword } = req.body;

    try{
        const employee = await Employee.findOne({employeeNumber: parseInt(employeeNumber)})

        if(!employee){
            const error = new Error('Hubo un error')
            return res.status(400).json({ msg: error.message });
        }
            // Actualizar la contraseña del empleado
        employee.password = newPassword; 
        await employee.save();

        return res.json({ msg: "Contraseña actualizada exitosamente" });

    }catch(error){
        console.log(error)
        res.status(500).json({ msg: "Error al actualizar la contraseña" });
    }
}

export {
    createEmployee,
    getEmployee,
    login,
    perfil,
    forgetPassword,
    changePassword
}