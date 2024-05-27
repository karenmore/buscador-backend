import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  employeeNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: true
  },
  activo: {
    type: Number,
    default: true
  }
});

employeeSchema.pre('save', async function(next) {
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

});

employeeSchema.methods.isValide = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password)
}

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;