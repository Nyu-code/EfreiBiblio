<template>
  <div>
    <form @submit.prevent="addLivre" class="container">
        <h2>Nouveau livre à ajouter</h2>
        <div class="input-field">
          <i class="fa-solid fa-heading"></i>
          <input type="text" v-model="newLivre.title" placeholder="Titre" required>
        </div>
        <div class="input-field">
          <i class="fa-solid fa-user-pen"></i>
          <input type="text" v-model="newLivre.author" placeholder="Auteur" required>
        </div>
        <div class="input-field">
          <i class="fa-solid fa-pen-ruler"></i>
          <input type="text" v-model="newLivre.edition" placeholder="Edition" required>
        </div>
        <div class="input-field">
          <i class="fa-solid fa-box-open"></i>
          <input type="number" v-model="newLivre.quantity" placeholder="Quantité" required>
        </div>
        <div class="input-field">
          <i class="fa-solid fa-image"></i>
          <input type="text" v-model="newLivre.image" placeholder="Lien vers l'image">
        </div>
        <button type="submit">Ajouter</button>
    </form>
  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      newLivre: {
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  },
  methods: {
    addLivre () {
      this.$emit('add-livre', this.newLivre)
    }
  }
}
</script>
<style scoped>
.input-field{
  max-width: 500px;
  width: 100%;
  height: 65px;
  background-color: lightgrey;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 25% 85%;
  padding: 0.4rem;

}

.input-field i {
  text-align: center;
  line-height: 70px;
  color: darkgray;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: black;
}

.input-field input::placeholder {
  color: darkgray;
  font-weight: 500;
}
.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

form{ 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding : 0 5 rem;
  overflow: hidden;
}

.title{
  font-size: 2.2rem;
  color:#333;
  margin-bottom: 10px;
}

</style>
