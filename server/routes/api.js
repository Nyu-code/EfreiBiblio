const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
//MDP A CHANGER
const sequelize = new Sequelize("bd_web_efreibiblio", "root", "hugo",{
  dialect:'mysql',
  host:'localhost'
})

try{
  sequelize.authenticate();
  console.log("Connecté à la base de donnée mysql !")
}catch(error){
  console.error("Impossible de se connecter, erreur suivante : ", error);
}


router.get('/livres', (req, res) => {
  sequelize.query("SELECT idlivre, title, author, edition, quantity, image FROM livre")
  .then(([results, metadata]) => {
    res.json(results)
  })

})

router.post('/livres', (req, res) => {
  const title = req.body.title
  const author = req.body.author
  const edition = req.body.edition
  const quantity = parseInt(req.body.quantity)
  const image = req.body.image

  // vérification de la validité des données d'entrée
  if (typeof title !== 'string' || title === '' ||
      typeof author !== 'string' || author === '' ||
      typeof edition !== 'string' || edition === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(quantity) || quantity <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }
  sequelize.query("INSERT INTO livre (title, author, edition, quantity, image) VALUES ('" + title + "', '"+ author +"', '"+ edition +"', "+ quantity +", '"+ image +"' );");
})

 function parseLivre (req, res, next) {
  const livreId = parseInt(req.params.livreId)

  if (isNaN(livreId)) {
    res.status(400).json({ message: 'livreId should be a number' })
    return
  }

  req.livreId = livreId
  sequelize.query("SELECT idlivre, title, author, edition, quantity, image FROM livre")
  .then(([results, metadata]) => {
    const livre = results.find(l => l.idlivre === req.livreId)
    if (!livre) {
      res.status(404).json({ message: 'livre ' + livreId + ' does not exist' })
      return
    }

    req.livre = livre
    next()
  })

}

router.route('/livre/:livreId')
  /**
   * Cette route envoie un livre particulier
   */
  .get(parseLivre, (req, res) => {
    res.json(req.livre)
  })

  .delete(parseLivre, (req, res) => {
    sequelize.query("DELETE FROM livre WHERE idlivre = " + req.livre.idlivre + ";")
    res.send()
  })


module.exports = router
