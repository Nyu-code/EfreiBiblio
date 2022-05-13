<template>
  <div>
      <add-user @add-user = 'addUser'></add-user>
      <login-user @login-user='loginUser'></login-user>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      addUser (newuser) {
        this.$emit('add-user', newuser)
      },
      loginUser (user) {
        this.$emit('login-user', user)       
      }
    },
    components:{
      LoginUser,
      AddUser
    },
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
