const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const AddArticle = window.httpVueLoader('./components/AddArticle.vue')

const routes = [
  { path: '/home', component: Home },
  { path: '/panier', component: Panier },
  { path: '/', component: Login },
  { path: '/addarticle', component: AddArticle}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    // const res2 = await axios.get('/api/panier')
    // this.panier = res2.data
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
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
