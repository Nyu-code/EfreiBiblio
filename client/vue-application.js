const Authentification = window.httpVueLoader('./components/Authentification.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Catalogue = window.httpVueLoader('./components/Catalogue.vue')
const AddLivre= window.httpVueLoader('./components/AjouterLivre.vue');
const Accueil= window.httpVueLoader('./components/Accueil.vue');

const routes = [
  { path: '/authentification', component: Authentification },
  { path: '/catalogue', component: Catalogue },
  { path: '/panier', component: Panier },
  { path: '/accueil', component: Accueil}
]

const router = new VueRouter({
  routes
})


var app = new Vue({
  router,
  el: '#app',
  data: {
    username : "",
    livres: [],
    panier: [],
    isAdmin: false,
    isConnected: false,
    username: ''
  },
  async mounted () {
    const res = await axios.get('/api/livres')
    this.livres = res.data
  },
  methods: {
    async addLivre (livre) {
      const res = await axios.post('/api/livres', livre)
      this.livres.push(res.data[0])
    },
    async deleteLivre (livreId) {
      await axios.delete('/api/livre/' + livreId)
      const index = this.livres.findIndex(l => l.idlivre === livreId)
      this.livres[index].quantity = 0;
    },
    async ajouterPanier(livre) {
      const res = await axios.post('/api/panier/', livre)
      const indexPanier = this.panier.findIndex(l => l.idpanier_item === res.data[0].idpanier_item)
      if(indexPanier == -1){
        this.panier.push(res.data[0])
      }else{
        this.panier[indexPanier].quantity += 1
      }
      const index = this.livres.findIndex(l => l.idlivre === livre.idlivre)
      this.livres[index].quantity = this.livres[index].quantity-1;
    },
    async restockLivre(idlivre, quantity) {
      const res = await axios.put("/api/livre/" + idlivre, quantity)
      const index = this.livres.findIndex(l => l.idlivre === idlivre)
      this.livres[index].quantity = res.data
    },
    async deletePanier(panierId) {
      const res = await axios.delete('/api/panier/'+ panierId)
      const indexPanier = this.panier.findIndex(l => l.idpanier_item === panierId)
      this.panier.splice(indexPanier, 1)
      const index = this.livres.findIndex(l => l.idlivre === res.data[0].id_livre)
      this.livres[index].quantity = this.livres[index].quantity+res.data[0].quantity;
    },
    async addUser (user) {
      const res = await axios.post('/api/register', user)
      if(res.data){
        alert( "Votre compte a été créé! Connectez-vous !")
      }else{
        alert("L'email est déjà utilisé")
      }
    },
    async loginUser (user) {
      const res = await axios.post('/api/login', user)
      if(res.data){
        const res2 = await axios.get('/api/panier')
        this.panier = res2.data
        this.isConnected = true
        const res3 = await axios.get('/api/checkAdmin')
        this.isAdmin = Boolean(res3.data[0].isAdmin)
        const res4 = await axios.get('/api/getUser')
        this.username = res4.data[0].username
        this.$router.push({ path: '/' })
        alert("Connexion réussite")
      }else{
          alert("Utilisateur n'existe pas ou mauvais mot de passe")
      }
    },
    async decoUser(user) {
      const res = await axios.post('/api/login', user)
      this.isConnected = false
      this.$router.push({ path: '/' })
      alert("Déconnexion réussite")
    }
  }
})
