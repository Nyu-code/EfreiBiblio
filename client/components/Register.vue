<template>
  <div>
    <form id=form @submit.prevent="addUser">
      <input type="text" v-model="newUser.username" placeholder="nom utilisateur" required>
      <input type="email" v-model="newUser.email" placeholder="adresse mail" required>
      <input type="password" v-model="newUser.password" placeholder="mot de passe" required>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
  module.exports = {
    data(){
      return{
        newUser: {
          username:'',
          email:'',
          password:''
        }
      }
    },
    methods: {
      addUser () {
        this.$emit('add-user', this.newUser)
      }
    }
  }

</script>

<style scoped>
html,
body {
    margin: 0;
    font-family: 'Shippori Antique', serif;
    font-size: 16px;
}
</style>
