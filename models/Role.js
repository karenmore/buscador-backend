import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
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

const Role = mongoose.model('Role', roleSchema);

export default Role;