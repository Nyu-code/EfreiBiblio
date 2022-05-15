<template>
    <div>
        <div v-if="isConnected">
            <table class="Panier">
                <tr class="Produit-header">
                    <th></th>
                    <th>Titre du livre</th>
                    <th>Auteur</th>
                    <th>Edition</th>
                    <th>Quantité</th>
                    <th id="delete"></th>
                </tr>
                <tr v-for="livre in panier" :key="livre.idpanier_item">
                    <td><img :src="livre.image" class="livre_image"></td>
                    <td><b>{{livre.title}}</b></td>
                    <td>{{livre.author}}</td>
                    <td>{{livre.edition}}</td>
                    <td>{{livre.quantity}}</td>
                    <td><img src="images/JPG/cross_icon.png" class="image-suppr" alt="" v-on:click="deletePanier(livre.idpanier_item)"/></td>
                </tr>
            </table>
            <div class="boutons_panier">
                <button id="vider" v-on:click="deleteAll()">Vider</button>
                <button id="valider" v-on:click="deleteAll()">Valider</button>
            </div>
        </div>
        <div v-if="!isConnected" class="msg-deco">
            <p class="msg-panier"><b> Il faut vous authentifier !</b> </p>
        </div>
    </div>
</template>

<script>
module.exports ={
    props : {
        panier: { type:Array, default:[]},
        isConnected: { type: Boolean, default: false }
    },
    methods: {
        deletePanier (panierId) {
            this.$emit('delete-panier', panierId)
        },
        deleteAll(){
            this.panier.forEach(livre => {
                this.deletePanier(livre.idpanier_item)
            });
        }
  }
}
</script>

<style scoped>

table{
    margin: 2rem 2rem;
    width: 95%;
    text-align: center;
    align-items: center;
    text-indent: initial;
    overflow: hidden;
    border-collapse: collapse;
    border-radius:15px;
    table-layout: fixed;
    box-shadow: 0 0 30px 0 rgba(0,0,0,.15);

}

th {
    background-color: rgb(73, 164, 255);
    border-top: none;
    color:white;
    padding:16px 0 16px 0;
}

td {
    padding:12px 0 12px 0;
    overflow-wrap: break-word;
}

td:first-child{
    font-weight: bold;
}

td:first-child, th:first-child {
    border-left: none;
}

tbody tr{
    background-color: #ffffff;
    border-bottom: 1px solid #f2f2f2;
}

#delete {
    padding : 10px;
}

#valider {
    display: flex;
    margin-left: auto;
    margin-right: 10%;
}
#vider {
    background-color:crimson;
    display: flex;
    margin-right: auto;
    margin-left: 10%;
    transition: all 0.3s ease 0s;
}
#vider:hover{
    background-color:lightcoral;
}
.boutons_panier {
    display: flex;
}
.livre_image {
    cursor: pointer;
    width: 40%;
}

.image-suppr {
    cursor: pointer;
    width: 20%;
}
.msg-deco {
    font-size: 30px;
}

.msg-panier {
    display: flex;
    justify-content: center;
}

</style>
