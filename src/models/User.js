const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: { type: String, required: true },
  nombre: { type: String },
  apellido: { type: String },
  dni: { type: String },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false },
  usuario: { type: String },
});
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
