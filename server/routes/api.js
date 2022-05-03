const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

//MDP A CHANGER
const sequelize = new Sequelize("bd_web_efreibiblio", "root", "MDP",{
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
