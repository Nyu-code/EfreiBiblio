<template>
  <div class="catalogue">
    <div class="search" :class="{active: isActive}">
      <div class="icon" @click="searchactive()"></div>
      <div class="input">
          <input type="text" v-model="input" placeholder="rechercher..." id="mysearch">
      </div>
      <span class="clear"></span>
    </div>    <article v-for="livre in filteredList" :key="livre.idlivre">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + livre.image + ')' }"></div>
      </div>
      <div class="article-content">
        <div class="article-title">
          <h2>{{ livre.title }}</h2>
          <div>
            <button @click="ajouterPanier(livre)" v-if="livre.quantity!=0">Emprunter</button>
            <button id="soldout" v-if="livre.quantity==0">Rupture</button>
            <button @click="deleteLivre(livre.idlivre)">Supprimer</button>
          </div>
        </div>
        <p>Quantité restante : {{ livre.quantity }}</p>
        <p>Auteur: {{ livre.author }}<br>Editeur: {{ livre.edition }}</p><br>
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
    input:"",
    isActive : true
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
    },
    searchactive(){
      this.isActive = !this.isActive;
    }
  },
  components:{
    AddLivre
  },
  
}

</script>

<style scoped>
.catalogue {
  margin: 2rem 2rem;
}
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

.search {
  position: relative;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 60px;
  transition: 0.5s;
  box-shadow: 0 0 0 5px rgb(25, 25, 180);
  overflow: hidden;
  margin-bottom: 3rem;
}

.search .icon {
  position: absolute;
  top :0;
  left: 0;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}
.search .icon::before{
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  border: 3px solid deepskyblue;
  border-radius: 50%;
  transform: translate(-4px,-4px);
}

.search .icon::after{
  content: '';
  position: absolute;
  width: 3px;
  height: 12px;
  background: deepskyblue;
  transform: translate(6px,6px) rotate(315deg);
}

.search .input{
  position: relative;
  width: 300px;
  height: 60px;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search .input input{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 10px 0;
}

.search.active{
  width: 100%;
}

#soldout {
  background-color: red;
}
</style>
