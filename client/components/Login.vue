<template>
  <div>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form class="sign-up-form" @submit.prevent="loginUser">
            <h2 class="title">Se connecter</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" v-model="user.email" placeholder="Enter Email" name="email" required>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="user.password" placeholder="Enter Password" name="psw" required>
            </div>
            <button type="submit" value="Login" class="btn solid">Connecter</button>
          </form>
          <form @submit.prevent="addUser" class="sign-in-form">
            <h2 class="title">S'inscrire</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" v-model="newUser.username" placeholder="Nom d'utilisateur">
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="newUser.email" placeholder="Adresse mail">
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="newUser.password" placeholder="Mot de passe">
            </div>
              <button type="submit" value="Sign up" class="btn solid"> S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      this.$emit('login-user', this.user)       
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.container{
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: white;
  overflow: hidden;
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
}

.title{
  font-size: 2.2rem;
  color:#333;
  margin-bottom: 10px;
}

.input-field{
  max-width: 380px;
  width: 100%;
  height: 65px;
  background-color: lightgrey;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0.4rem;

}

.input-field i {
  text-align: center;
  line-height: 55px;
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

.btn{
  width: 300px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 50px;
  cursor: pointer;
  background-color: cornflowerblue;
  color : white;
  text-transform: 600;
  margin: 10px 0;
  transition: 0.5s;
}

.btn:hover{
  background-color: dodgerblue;
}

</style>
