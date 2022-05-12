const Authentification = window.httpVueLoader('./components/Authentification.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Catalogue = window.httpVueLoader('./components/Catalogue.vue')
const AddLivre= window.httpVueLoader('./components/AjouterLivre.vue')

const routes = [
  { path: '/authentification', component: Authentification },
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
      this.livres.push(res.data[0])
    },
    async deleteLivre (livreId) {
      await axios.delete('/api/livre/' + livreId)
      const index = this.livres.findIndex(l => l.idlivre === livreId)
      this.livres[index].quantity = 0;
    },
    async ajouterPanier(livre) {
      const res = await axios.post('/api/panier/', livre)
      this.panier.push(res.data)
      const index = this.livres.findIndex(l => l.idlivre === livre.idlivre)
      this.livres[index].quantity = this.livres[index].quantity-1;
    }
  }
})
