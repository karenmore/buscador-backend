import Activo from '../models/Activo.js';

export const getActivos = async (req, res) => {
  try {
    const activos = await Activo.find({});
    res.status(200).json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createActivo = async (req, res) => {
  const { value, label } = req.body;

  try {
    const activo = new Activo({ value, label });
    await activo.save();
    res.status(201).json(activo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};