<template>
  <div>
    <table class="Panier">
        <tr class="Produit-header">
            <th>Titre du livre</th>
            <th>Auteur</th>
            <th>Edition</th>
            <th>Quantité</th>
            <th id="delete"></th>
        </tr>
    </table>
  </div>
</template>

<script>

</script>

<style scoped>
html,
body {
    margin: 0;
    font-family: 'Shippori Antique', serif;
    font-size: 16px;
}

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

</style>
