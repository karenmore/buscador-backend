import mongoose from "mongoose";

const activoSchema = mongoose.Schema({
  value: {
    type: Number,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  }
});

const Activo = mongoose.model('Activo', activoSchema);

export default Activo;