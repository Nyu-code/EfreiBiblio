<template>
  <div>
    <input type="text" v-model="input" placeholder="titre">
    <article v-for="livre in filteredList" :key="livre.idlivre">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + livre.image + ')' }"></div>
      </div>
      <div class="article-content">
        <div class="article-title">
          <h2>{{ livre.title }} - {{ livre.quantity }}</h2>
          <div>
            <button @click="ajouterPanier(livre)">Emprunter</button>
            <button @click="deleteLivre(livre.idlivre)">Supprimer</button>
          </div>
        </div>
        <p>Auteur: {{ livre.author }}<br>Editeur: {{ livre.edition }}</p>
      </div>
    </article>
    <div class="item error" v-if="input&&!filteredList.length">
      <p>Pas de résultats!</p>
    </div>
    <add-livre @add-livre='addLivre'></add-livre>
  </div>
</template>

<script>
module.exports = {
  props: {
    livres: { type: Array, default: [] },
    input:""
  },
  computed: {
    filteredList() {
      let filteredList = this.livres
      filteredList = filteredList.filter((item) => {
        if(this.input == null){
          return(true)
        }else{
          return(item.title.toLowerCase().includes(this.input.toLowerCase()))
        }
      })
      return filteredList;
    },
  },
  methods: {
    addLivre (newLivre) {
      this.$emit('add-livre', newLivre)
    },
    deleteLivre (livreId) {
      this.$emit('delete-livre', livreId)
    },
    ajouterPanier(livre){
      this.$emit('ajouter-panier',livre)
    }
  },
  components:{
    AddLivre
  },
  
}

</script>

<style scoped>
article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
</style>
