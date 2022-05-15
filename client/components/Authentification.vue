<template>
<div>
    <div class="container" :class="[isSignUpMode ? 'sign-up-mode' : '']">
      <div class="forms-container">
        <div class="signin-signup">

          <h2 class="title" v-if="isConnected">Bienvenue {{username}} !</h2>
          <button class="btn solid" v-if="isConnected" @click="decoUser(user)">Déconnexion</button>

          <form class="sign-in-form" @submit.prevent="loginUser" v-if="!isConnected">
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

          <form @submit.prevent="addUser" class="sign-up-form" v-if="!isConnected">
            <h2 class="title">S'inscrire</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" v-model="newUser.username" placeholder="Nom d'utilisateur" required>
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="newUser.email" placeholder="Adresse mail" required>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="newUser.password" placeholder="Mot de passe" required>
            </div>
              <button type="submit" value="Sign up" class="btn solid"> S'inscrire</button>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content" v-if="!isConnected">
            <h3>Nouveaux utilisateur ?</h3>
            <p>Venez découvrir plein de livres dans notre EfreiBiblio !</p>
            <button class="btn transparent" id="sign-up-btn" @click="signUpMode()">S'inscrire</button>
          </div>
          <img src="images/SVG/register.svg" class="image" alt="">
        </div>
        <div class="panel right-panel" v-if="!isConnected">
          <div class="content">
            <h3>Déjà inscrit ?</h3>
            <p>N'hésitez pas à donner votre avis sur les livres que vous empruntez !</p>
            <button class="btn transparent" id="sign-in-btn" @click="signUpMode()">Se connecter</button>
          </div>
          <img src="images/SVG/signin.svg" class="image" alt="">
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
      },
      newUser: {
        username:'',
        email:'',
        password:''
      },
      isSignUpMode : false,
    }
  },
  props: {
    username : '',
    isConnected: { type: Boolean, default: false }
  },
  methods: {
    loginUser () {
      this.$emit('login-user', this.user)       
    },
    decoUser(){
      this.$emit('deco-user', this.user)
    },
    addUser() {
      this.$emit('add-user', this.newUser)
    },
    signUpMode(){
      this.isSignUpMode = !this.isSignUpMode;
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
.container::before{
  content:'';
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #4481eb, #04befe);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
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
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: 0.2s 0.8s ease-in-out;
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
.signin-signup{
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%,-50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}
form.sign-up-form{
  z-index: 1;
  opacity: 0;
}
.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  z-index: 7;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}
.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: white;
  transition: .9s .6s ease-in-out;
}

.panel h3{
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent{
  margin: 0;
  background: none;
  border: 2px solid white;
  width: 150px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}
.image {
  width: 100%;
  transition: 1.1s .6s ease-in-out;
}

.right-panel .content, .right-panel .image{
  transform: translateX(1000px);
}

/* animation */
.container.sign-up-mode:before{
  transform: translate(100%, -50%);
  right: 52%;
}
.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content{
  transform: translateX(-1000px);
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content{
  transform: translateX(0px);
}

.container.sign-up-mode .left-panel{
  pointer-events: none;
}
.container.sign-up-mode .right-panel{
  pointer-events: all;
}

.container.sign-up-mode .signin-signup{
  left: 25%;
}

.container.sign-up-mode form.sign-in-form{
  z-index: 1;
  opacity: 0;
}

.container.sign-up-mode form.sign-up-form{
  z-index: 2;
  opacity: 1;
}
</style>
