const { localeData } = require("moment");
const mongoose = require("mongoose");

const User = require("./User");
//const { Schema } = mongoose;
const ClienteSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ticket: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  direccion: { type: String, required: true },
  zip: { type: String },
  movil: { type: Number, required: true },
  movil1: { type: Number },
  movil2: { type: Number },
  email: { type: String },
  descripcion: { type: String, required: true },
  detalles: [
    {
      observacion: { type: String },
      estatus: { type: String },
      anexo: { type: String },
      modified: { type: Date, default: Date.now },
      usuario_detalles: { type: String },
    },
  ],
  orden_trabajo: [
    {
      operario: { type: String },
      fecha_trabajo: { type: Date },
      hora_trabajo: { type: Date },
      usuario_trabajo: { type: String },
    },
  ],
  usuario: { type: String },
});

module.exports = mongoose.model("Cliente", ClienteSchema);
