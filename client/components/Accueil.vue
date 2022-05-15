<template>
  <div>
  <div class="content">
    <div class="text">
      <h2>Venez découvrir plein de livres dans la EfreiBiblio !</h2><br>
      <div class="logoimg">
      <img src="images/JPG/Livre.png">
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna est, fermentum eget congue non, pellentesque facilisis tortor. 
        Curabitur a tortor leo. Aenean eget rutrum ex. Nam sed scelerisque dolor. Suspendisse sodales elementum scelerisque. 
        Ut at sollicitudin est, vitae convallis eros. Nulla consequat tempus felis, in egestas nibh tincidunt rutrum. 
        Sed iaculis magna erat, eget rhoncus nibh efficitur in. Aenean efficitur fermentum purus, a iaculis mauris dictum eu.</p>
    </div><br>
    <div class="decouvrir">
      <button class="btn-catalogue"><a href="#/Catalogue">Découvrir</a></button>
    </div>
  </div>
  </div>
</template>

<script>

</script>

<style scoped>
.content{
  margin: 2rem, 2rem;
}
.decouvrir{
  display: flex;
  justify-content: center;
  align-items: center;
}
.logoimg {
  display: flex;
  justify-content: center;
}
h2{
  display: flex;
  justify-content: center;
  font-size: 30px;
}

p{
  display: flex;
  justify-content: center;
  margin-left: 5rem;
  margin-right: 5rem;
}
.btn-catalogue {
  width: 30%;
}
a {
  color: white;
}
</style>

