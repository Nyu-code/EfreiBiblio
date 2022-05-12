const Authentification = window.httpVueLoader('./components/Authentification.vue')
const login = window.httpVueLoader('./components/Login.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Catalogue = window.httpVueLoader('./components/Catalogue.vue')
const AddLivre= window.httpVueLoader('./components/AjouterLivre.vue')

const routes = [
  { path: '/authentification', component: Authentification },
  { path: '/login', component: login },
  { path: '/catalogue', component: Catalogue },
  { path: '/panier', component: Panier }
]

const router = new VueRouter({
  routes
})


var app = new Vue({
  router,
  el: '#app',
  data: {
    livres: [],
    panier: [],
  },
  async mounted () {
    const res = await axios.get('/api/livres')
    const res2 = await axios.get('/api/panier')
    this.livres = res.data
    this.panier = res2.data
  },
  methods: {
    async addLivre (livre) {
      const res = await axios.post('/api/livres', livre)
      this.livres.push(res.data)
    },
    async deleteLivre (livreId) {
      await axios.delete('/api/livre/' + livreId)
      const index = this.livres.findIndex(l => l.idlivre === livreId)
    },
    async ajouterPanier(livre) {
      const res = await axios.post('/api/panier/', livre)
      this.panier.livres.push(res.data)
    },
    async addUser (user) {
      const res = await axios.post('/api/register', user)
    },
    async loginUser (user) {
      const res = await axios.get('/api/login', { params: { email: user.email, password: user.password } })

      if(res.data){
        this.$router.push({ path: '/home' })
      }else{
          alert("Utilisateur n'existe pas ou mauvais mot de passe")
      } 
    },

  }
})
