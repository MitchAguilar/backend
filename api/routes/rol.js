const express= require('express');
const router= express.Router();
// invoca la conexion
const conexion = require('../config/conexion');
// token para las peticiones a mysql
const jwt = require('jsonwebtoken');

// check tocken
router.use(function (req, res, next) {
  //Validate users access token on each request to our API.
  var token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, 'MCG', function (err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: 'Authorization required.'
        });
      } else {
        const content = jwt.verify(token, 'MCG');
        req.data = content;
        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
    next();
  }
});

// Listar roles
router.get('/', (req,res)=>{
  conexion.query('CALL `ConsultarRoles`()', (err,rows,fields) => {
    if(!err){
      res.json(rows[0]);
    }else{
      console.log(err);
    }
  })
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  conexion.query(`CALL ConsultarRol('${id}')`, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    }
  });
});


//crear rol
router.post("/", (req, res) => {
  const {nombre, descripcion} =  req.body;
  conexion.query(
    `CALL CrearRol('${nombre}', '${descripcion}')`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      }
    }
  );
});
//eliminar 
router.delete("/", (req, res) => {
  const {id} = req.body;
  conexion.query(`CALL EliminarRol('${id}')`, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    }else{
      res.json(err);
    }
  });
});
//modificar
router.put("/:id", (req, res) => {
  const {id} = req.params;
  const {nombre, descripcion} = req.body;
  let sql = `CALL EditarRol('${id}', '${nombre}','${descripcion}')`;
  conexion.query(sql, (err, rows, fields) => {
    if (!err) {
      if (!err) {
        res.json(rows[0]);
      }
    }
  });
});
module.exports = router;