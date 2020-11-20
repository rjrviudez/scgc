const express = require("express");
const router = express.Router();
//const mongooseHistory = require("mongoose-history");
const bodyParser = require("body-parser");

//const router = require("express-promise-router")();
//const mongoose = require("mongoose");
//const Note = mongoose.model("Note");

const Cliente = require("../models/Cliente");


const { isAuthenticated } = require("../helpers/auth");
const User = require("../models/User");
router.get("/clientes/add", isAuthenticated, (req, res) => {
  res.render("clientes/new-cliente");
});
router.get("/clientes/inform", isAuthenticated, (req, res) => {
  res.render("clientes/informes");
});
router.post("/clientes/new-cliente", isAuthenticated, async (req, res) => {
  const {
    ticket,
    name,
    direccion,
    zip,
    movil,
    movil1,
    movil2,
    email,
    descripcion,
    usuario,
  } = req.body;

  const errors = [];
  if (!ticket) {
    errors.push({ text: "Favor colocar el numero del ticket del cliente" });
  }
  if (!name) {
    errors.push({ text: "Favor colocar el Nombre del cliente" });
  }

  if (!direccion) {
    errors.push({ text: "Favor colocar direccion" });
  }
  if (!movil) {
    errors.push({ text: "Favor colocar el Nro telefonico" });
  }
  if (!descripcion) {
    errors.push({
      text: "Favor colocar la descripcion del servicio a resolver",
    });
  }

  if (errors.length > 0) {
    res.render("clientes/new-cliente", {
      errors,
      ticket,
      name,
      direccion,
      zip,
      movil,
      movil1,
      movil2,
      email,
      descripcion,
      usuario,
    });
  } else {
    const newCliente = new Cliente({
      ticket,
      name,
      direccion,
      zip,
      movil,
      movil1,
      movil2,
      email,
      descripcion,
      usuario,
    });
    await newCliente.save();
    req.flash("success_msg", "Cliente agregado satisfactoriamente");
    res.redirect("/clientes");
  }
});
router.get("/clientes", isAuthenticated, async (req, res) => {
  var clientes = await Cliente.find().sort({ date: -1 });

  for (let i = 0; i < clientes.length; i++) {
    var fecha = clientes[i].date;

    clientes[i].fecha =
      String(fecha.getDate()) +
      "/" +
      String(fecha.getMonth() + 1) +
      "/" +
      String(fecha.getFullYear());

    clientes[i].hora =
      String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
  }

  res.render("clientes/all-clientes", { clientes });
});

// **********************Informes por Operador*******************
router.post("/clientes/inf_operador/", isAuthenticated, async (req, res) => {
  console.log(req.body);
  const clientes = await Cliente.find({
    operario: req.body.operario,
  });
  console.log({ clientes });
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].orden_trabajo[0]) {
      var fecha = clientes[i].orden_trabajo[0].fecha_trabajo;
      clientes[i].fecha =
        String(fecha.getDate()) +
        "/" +
        String(fecha.getMonth() + 1) +
        "/" +
        String(fecha.getFullYear());
      clientes[i].hora =
        String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
    }
  }
  res.render("clientes/info_operador", { clientes });
});
//**************informes por Estado */
router.post("/clientes/inf_estado", isAuthenticated, async (req, res) => {
  const clientes = await Cliente.find({ operador: req.body.operador });
  for (let i = 0; i < clientes.length; i++) {
    var fecha = clientes[i].date;
    clientes[i].fecha =
      String(fecha.getDate()) +
      "/" +
      String(fecha.getMonth() + 1) +
      "/" +
      String(fecha.getFullYear());
    clientes[i].hora =
      String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
  }
  res.render("/info_estado", { clientes });
});

//*****************busqueda de clientes por : *****************/

router.get("/clientes/buscar-cliente", (req, res) => {
  res.render("clientes/buscar-cliente");
});
//****Busqueda por ticket****/

router.post("/clientes/buscar-cliente", isAuthenticated, async (req, res) => {
  if (req.body.ticket) {
    const clientes = await Cliente.find({ ticket: req.body.ticket });
    for (let i = 0; i < clientes.length; i++) {
      var fecha = clientes[i].date;
      clientes[i].fecha =
        String(fecha.getDate()) +
        "/" +
        String(fecha.getMonth() + 1) +
        "/" +
        String(fecha.getFullYear());
      clientes[i].hora =
        String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
    }

    res.render("clientes/res-buscar-cliente", { clientes });
  }

  // **********Busqueda por nombre ********//
  if (req.body.name) {
    const clientes = await Cliente.find({ name: req.body.name });

    for (let i = 0; i < clientes.length; i++) {
      var fecha = clientes[i].date;
      clientes[i].fecha =
        String(fecha.getDate()) +
        "/" +
        String(fecha.getMonth() + 1) +
        "/" +
        String(fecha.getFullYear());
      clientes[i].hora =
        String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
    }

    res.render("clientes/res-buscar-cliente", { clientes });
  }

  //*********** Busqueda por direccion */

  if (req.body.direccion) {
    const clientes = await Cliente.find({ direccion: req.body.direccion });
    for (let i = 0; i < clientes.length; i++) {
      var fecha = clientes[i].date;
      clientes[i].fecha =
        String(fecha.getDate()) +
        "/" +
        String(fecha.getMonth() + 1) +
        "/" +
        String(fecha.getFullYear());
      clientes[i].hora =
        String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
    }
    res.render("clientes/res-buscar-cliente", { clientes });
  }

  //**************Busqueda por Movil ***********/

  if (req.body.movil) {
    const clientes = await Cliente.find({ movil: req.body.movil });
    for (let i = 0; i < clientes.length; i++) {
      var fecha = clientes[i].date;
      clientes[i].fecha =
        String(fecha.getDate()) +
        "/" +
        String(fecha.getMonth() + 1) +
        "/" +
        String(fecha.getFullYear());
      clientes[i].hora =
        String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
    }

    res.render("clientes/res-buscar-cliente", { clientes });
  }

  //****************Busqueda por estatus del cliente */
  if (req.body.estatus) {
    const clientes = await Cliente.find({ estatus: req.body.estatus });
    for (let i = 0; i < clientes.length; i++) {
      var fecha = clientes[i].date;
      clientes[i].fecha =
        String(fecha.getDate()) +
        "/" +
        String(fecha.getMonth() + 1) +
        "/" +
        String(fecha.getFullYear());
      clientes[i].hora =
        String(fecha.getHours() + 2) + ":" + String(fecha.getUTCMinutes());
    }

    res.render("clientes/res-buscar-cliente", { clientes });
  } else {
    res.render("clientes/res-buscar-cliente", { clientes });
  }
});

//Asignar  trabajo  Operario

router.post("/clientes/orden/:id", isAuthenticated, async (req, res) => {
  const { operario, fecha_trabajo, hora_trabajo, usuario_trabajo } = req.body;
  if (
    await Cliente.findOne(
      {
        operario: operario,
        fecha_trabajo: fecha_trabajo,
        hora_trabajo: hora_trabajo,
      } || {
          operario: operario,
          fecha_trabajo: fecha_trabajo,
          hora_trabajo: hora_trabajo + 1.0,
        } || {
          operario: operario,
          fecha_trabajo: fecha_trabajo,
          hora_trabajo: hora_trabajo - 1.0,
        }
    )
  ) {
    req.flash(
      "error_msg",
      "Operario tiene asignado otra orden - Seleccione otra fecha y/u hora"
    );
    res.redirect("/clientes");
  } else {
    await Cliente.findByIdAndUpdate(req.params.id.trim(), {
      $set: {
        orden_trabajo: [
          {
            operario: operario,
            fecha_trabajo: hora_trabajo,
            hora_trabajo: hora_trabajo,
            usuario_trabajo: usuario_trabajo,
          },
        ],
      },
    });

    req.flash("success_msg", "Trabajo asignado Correctamente");
    res.redirect("/clientes");
  }
});

router.post("/clientes/history/:id", isAuthenticated, async (req, res) => {
  const { observacion, estatus, anexo, usuario_det } = req.body;

  await Cliente.findByIdAndUpdate(req.params.id.trim(), {
    $push: {
      detalles: [
        {
          observacion: observacion,
          estatus: estatus,
          anexo: anexo,
          usuario_detalles: usuario_det,
        },
      ],
    },
  });
  req.flash("success_msg", "Detalles de la Observacion agregado correctamente");
  res.redirect("/clientes");
});

router.get("/clientes/estado/:id", isAuthenticated, async (req, res) => {
  const cliente = await Cliente.findById(req.params.id.trim());
  var fecha = cliente.date;
  cliente.fecha =
    String(fecha.getDate()) +
    "/" +
    String(fecha.getMonth() + 1) +
    "/" +
    String(fecha.getFullYear());
  cliente.hora =
    String(fecha.getHours() + 0) + ":" + String(fecha.getUTCMinutes());

  for (let i = 0; i < cliente.detalles.length; i++) {
    var fecha = cliente.detalles[i].modified;
    cliente.detalles[i].fecha =
      String(fecha.getDate()) +
      "/" +
      String(fecha.getMonth() + 1) +
      "/" +
      String(fecha.getFullYear());
    cliente.detalles[i].hora =
      String(fecha.getHours() + 0) + ":" + String(fecha.getUTCMinutes());
  }
  if (cliente.orden_trabajo[0]) {
    fecha1 = cliente.orden_trabajo[0].fecha_trabajo;

    cliente.orden_trabajo[0].fecha =
      String(fecha1.getDate()) +
      "/" +
      String(fecha1.getMonth() + 1) +
      "/" +
      String(fecha1.getFullYear());
    cliente.orden_trabajo[0].hora =
      String(fecha1.getHours() + 0) + ":" + String(fecha1.getUTCMinutes());
  }

  const clientes = await Cliente.find();

  for (let i = 0; i < clientes.length; i++) {
    var hoy = Date.now();

    if (clientes[i].orden_trabajo[0]) {
      if (clientes[i].orden_trabajo[0].fecha_trabajo > hoy) {
        clientes[i].cliente_pendiente = clientes[i].name;

        fecha1 = clientes[i].orden_trabajo[0].fecha_trabajo;

        clientes[i].fecha_pendiente =
          String(fecha1.getDate()) +
          "/" +
          String(fecha1.getMonth() + 1) +
          "/" +
          String(fecha1.getFullYear());
        clientes[i].hora_pendiente =
          String(fecha1.getHours() + 0) + ":" + String(fecha1.getUTCMinutes());

        clientes[i].operario_pendiente = clientes[i].orden_trabajo[0].operario;
      } else {
      }
    }
  }

  res.render("clientes/estado-cliente", { cliente, clientes });
});

router.get("/clientes/edit/:id", isAuthenticated, async (req, res) => {
  const cliente = await Cliente.findById(req.params.id.trim());

  res.render("clientes/edit-cliente", { cliente });
});
router.post("/clientes/edit-cliente/:id", isAuthenticated, async (req, res) => {
  const {
    ticket,
    name,
    direccion,
    zip,
    movil,
    movil1,
    movil2,
    email,
    descripcion,
    usuario,
  } = req.body;
  await Cliente.findByIdAndUpdate(req.params.id.trim(), {
    ticket,
    name,
    direccion,
    zip,
    movil,
    movil1,
    movil2,
    email,
    descripcion,
    usuario,
  });
  req.flash("success_msg", "Cliente actualizado correctamente");
  res.redirect("/clientes");
});
router.get("/clientes/delete/:id", isAuthenticated, async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id.trim());

  req.flash("success_msg", "Cliente eliminado satisfactoriamente");
  res.redirect("/clientes");
});
router.get("/clientes/ver_imagen/:id", isAuthenticated, async (req, res) => {
  const cliente = await Cliente.findById(req.params.id.trim());
  for (let index = 0; index < cliente.detalles.length; index++) {
    if (cliente.detalles[index].anexo == req.params.nombre_archivo) {
      imagen = cliente.detalles[index].anexo;
    }
  }
  res.render("clientes/imagen", { imagen });
});

module.exports = router;
