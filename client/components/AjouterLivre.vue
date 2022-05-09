<template>
  <div>
    <form @submit.prevent="addLivre">
        <h2>Nouveau livre à ajouter</h2>
        <input type="text" v-model="newLivre.title" placeholder="Titre" required>
        <input type="text" v-model="newLivre.author" placeholder="Auteur" required>
        <input type="text" v-model="newLivre.edition" placeholder="Edition" required>
        <input type="number" v-model="newLivre.quantity" placeholder="Quantité" required>
        <input type="text" v-model="newLivre.image" placeholder="Lien vers l'image">
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

</style>
