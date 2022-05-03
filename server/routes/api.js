const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize("bd_web_projet", "root", "projet",{
  dialect:'mysql',
  host:'localhost'
})

try{
  sequelize.authenticate();
  console.log("Connecté à la base de donnée mysql !")
}catch(error){
  console.error("Impossible de se connecter, erreur suivante : ", error);
}





module.exports = router
