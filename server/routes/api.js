const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//MDP A CHANGER
const sequelize = new Sequelize("bd_web_efreibiblio", "root", "1069071822",{
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
  sequelize.query("INSERT INTO livre (title, author, edition, quantity, image) VALUES ('" + title + "', '"+ author +"', '"+ edition +"', "+ quantity +", '"+ image +"' );")
  .then(([results, metadata]) => {
    sequelize.query("SELECT idlivre, title, author, edition, quantity, image FROM livre WHERE idlivre=(SELECT max(idlivre) FROM livre)")
    .then(([results, metadata]) => {
      res.json(results)
    })
  })
})

router.get('/panier', (req, res) => {
  sequelize.query("SELECT panier_item.idpanier_item, panier_item.quantity, livre.idlivre,livre.title, livre.author, livre.edition, livre.image FROM livre, panier_item WHERE livre.idlivre = panier_item.id_livre AND panier_item.id_panier = " + req.session.panierId)
  .then(([results, metadata]) => {
    res.json(results)
  })
})

function lowerQuantity (req, res, next) {
  const livreId = req.body.idlivre
  let newQuantity = req.body.quantity - 1
  req.livreId = livreId
  sequelize.query("UPDATE livre SET quantity = " + newQuantity + " WHERE idlivre = " + livreId + ";")
  .then(([results, metadata]) => {
    next()
  })
}

router.route('/panier')
  .post(lowerQuantity, (req, res) => {
    const idlivre = req.body.idlivre
    const id_panier = req.session.panierId
    sequelize.query("SELECT quantity FROM panier_item WHERE id_livre = " + idlivre + " AND id_panier = " + id_panier + ";")
    .then(([results, metadata]) => {
      if(results[0] != null){
        let newQuantity = results[0].quantity + 1;
        sequelize.query("UPDATE panier_item SET quantity = " + newQuantity + " WHERE  id_livre = " + idlivre + " AND id_panier = " + id_panier + ";")
        .then(([results, metadata]) => {
          sequelize.query("SELECT panier_item.idpanier_item, panier_item.quantity, livre.idlivre, livre.title, livre.author, livre.edition, livre.image FROM livre, panier_item WHERE panier_item.id_livre = livre.idlivre AND livre.idlivre = " + idlivre + " AND panier_item.id_panier = " + id_panier)
          .then(([results, metadata]) => {
            res.json(results)
          })        
        })
      }else{
        let quantity = 1
        sequelize.query("INSERT INTO panier_item (id_livre, quantity, id_panier) VALUES (" + idlivre + ", "+ quantity +", "+ id_panier + " );")
        .then(([results, metadata]) => {
          sequelize.query("SELECT panier_item.idpanier_item, panier_item.quantity, livre.idlivre, livre.title, livre.author, livre.edition, livre.image FROM livre, panier_item WHERE panier_item.id_livre = livre.idlivre AND livre.idlivre = " + idlivre + " AND panier_item.id_panier = " + id_panier)
          .then(([results, metadata]) => {
            res.json(results)
          })
        })
      }
    })
  })

  router.delete('/panier/:panierId', (req, res) => {
    const panierItemId = req.params.panierId
    const panierId = req.session.panierId
    sequelize.query("SELECT id_livre, quantity FROM panier_item WHERE idpanier_item = " + panierItemId + " AND id_panier = "+ panierId + ";")
    .then(([results, metadata]) => {
      sequelize.query("DELETE FROM panier_item WHERE idpanier_item = " + panierItemId + " AND id_panier = "+ panierId + ";")
      var resultats = results;
      sequelize.query("UPDATE livre SET quantity = quantity + " + results[0].quantity + " WHERE idlivre = " + results[0].id_livre + ";")
      .then(([results, metadata]) => {
        res.json(resultats)
      }) 
    })  
  })


  router.post("/register", (req, res) => {
    const saltRounds = 10
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }
    sequelize.query("SELECT iduser FROM user WHERE email = '"+ user.email + "'")
    .then(([results, metadata]) => {
      if(results.length<1){
        bcrypt.hash(user.password, saltRounds, (err, hash) => {  
          sequelize.query("INSERT INTO USER (username, email, password, isAdmin) VALUES ('" + user.username + "','" + user.email + "', '" + hash + "'," + false + ");")
          .then(([results, metadata]) => {
            sequelize.query("SELECT iduser FROM user WHERE email = '" + user.email + "';")
            .then(([results, metadata]) => {
              sequelize.query("INSERT INTO panier(id_user) VALUES (" + results[0].iduser + ");")
              .then(([results, metadata]) => {
                res.json(true)
              })
            })
          })
        })
      }else{
        res.json(false)
      }
    })
  });

  router.get('/checkAdmin', (req, res) => {
    sequelize.query("SELECT isAdmin FROM user, panier WHERE iduser = " + req.session.userId)
    .then(([results, metadata]) => {
      res.json(results)
    })
  })

  router.get('/getUser', (req, res) => {
    sequelize.query("SELECT username FROM user WHERE iduser = " + req.session.userId)
    .then(([results, metadata]) => {
      res.json(results)
    })
  })

  router.post('/posts', verifyToken,(req,res)=>{
    jwt.verify(req.token, 'sdgsdgksfdngsgksd',(err,authData) =>{
      if(err){
        res.sendStatus(403) //forbidden
      }else{
        res.json({
          message:"créé",
          authData,
        })
      }
    })
  })

  let refreshTokens = []
  router.post('/token', (req,res) =>{
    const refreshToken = req.body.token
    if(refreshToken == null){
      return res.sendStatus(401)
    }
    if(!refreshTokens.includes(refreshToken)){
      return res.sendStatus(403)
    }
    jwt.verify(refreshToken,'jsdqngsdnjqsnsqdnvcjlznz63457435645', (err, user) => {
      if(err){
        return res.sendStatus(403)
      }
      const token = jwt.sign({user:user}, "sdgsdgksfdngsgksd", {expiresIn:'1800s'})
      res.json({token: token})
    })
  })

  router.delete('/logoutTo', (req,res) =>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })

  router.post('/login', (req, res) => {
    try{
      const email = req.body.email
      const empty = ''
      const password = req.body.password

      sequelize.query("SELECT idpanier, iduser, password, username FROM user, panier WHERE iduser = id_user AND email = '" + email + "'")
      .then(([results, metadata]) => {
        const user = {
          email: req.body.email,
        }
        if(results != empty){
          hashedPassword = results[0].password
          bcrypt.compare(password, hashedPassword, function(err, same){
            if(err){
              res.json(false)
              return;
            }else{
              if (same){
                req.session.panierId = results[0].idpanier
                req.session.userId = results[0].iduser
                const token = jwt.sign({user:user}, "sdgsdgksfdngsgksd", {expiresIn:'1800s'})
                const refreshToken = jwt.sign(user, "jsdqngsdnjqsnsqdnvcjlznz63457435645")
                refreshTokens.push(refreshToken)
                res.json({token: token, refreshToken: refreshToken})
                return;
              }else{
                res.json(false)
                return;
              }
            }
          })
        }else{
          res.json(false)
          return;
        }
      })
    }catch(err){
        console.log(err)
      }
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
    sequelize.query("UPDATE livre SET quantity = 0 WHERE idlivre = " + req.livre.idlivre + ";")
    res.send()
  })

  .put(parseLivre, (req, res) => {
    let newQuantity = parseInt(req.body.addedQuantity) + parseInt(req.body.oldQuantity)
    if(newQuantity <= 0){
      res.status(400).json({message : 'Quantité non valide ... '})
      return
    }
    sequelize.query("UPDATE livre SET quantity = " + newQuantity + " WHERE idlivre = " + req.livre.idlivre + ";")
    res.json(newQuantity)
  })


  function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(' ')[1]
      req.token = bearerToken
      next()
    }else{
      res.sendStatus(403)
    }
  }

router.post("/register", (req, res) => {
  const saltRounds = 10
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        sequelize.query("INSERT INTO USER (username, email, password, isAdmin) VALUES ('" + user.username + "','" + user.email + "', '" + hash + "'," + false + ");");
    })
})
router.get('/getUser', (req, res) => {
  sequelize.query("SELECT username FROM user WHERE iduser = " + req.session.userId)
  .then(([results, metadata]) => {
    res.json(results)
  })
})
;



module.exports = router
