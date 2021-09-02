const express= require('express');
const router= express.Router();
// invoca la conexion
const conexion = require('../config/conexion');
// token para las peticiones a mysql
const jwt = require('jsonwebtoken');

// Listar clientes
router.get('/', (req,res)=>{
    conexion.query('CALL `ConsultarClientes`()', (err,rows,fields) => {
      if(!err){
        res.json(rows);
      }else{
        console.log(err);
      }
    })
});


module.exports = router;