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
    panier: {
      createdAt: null,
      updatedAt: null,
      livres: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/livres')
    this.livres = res.data
  },
  methods: {
    async addLivre (livre) {
      const res = await axios.post('/api/livres', livre)
      this.livres.push(res.data)
    },
    async deleteLivre (livreId) {
      await axios.delete('/api/livre/' + livreId)
      const index = this.livres.findIndex(l => l.idlivre === livreId)
      this.livres.splice(index, 1)
    }
  }
})
