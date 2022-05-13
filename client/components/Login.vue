<template>
    <div>
        <form @submit.prevent="loginUser">
            <div class="container">
                <label for="email"><b>Email</b></label>
                <input type="text" v-model="user.email" placeholder="Enter Email" name="email" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" v-model="user.password" placeholder="Enter Password" name="psw" required>

                <button type="submit">Login</button>
            </div>
        </form>
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
form {
  border: 3px solid #f1f1f1;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Add padding to containers */
.container {
  padding: 16px;
}
</style>
