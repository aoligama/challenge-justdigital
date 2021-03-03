<template>
  <v-container flat>
    <v-row class="mr-0">
      <v-col>
        <h5>
          Carrinho
        </h5>
      </v-col>
    </v-row>
    <v-row class="mr-0">
      <v-col>
        <small class="grey--text">{{ qtdItems }} Iten(s)</small>
      </v-col>
    </v-row>
    <v-row class="products-grid mr-0">
      <v-col cols="12" class="card-product" v-for="(product, index) in listProducts" :key="index">
        <img :src="product.picture">
        <span class="span-title">{{ product.title }}</span>
        <span class="span-price">R$ {{ product.price }}</span>

        <v-text-field
          class="input-quant"
          label="Qtd"
          :value="product.quantity"
          type="number"
        ></v-text-field>

        <v-btn
          class="btn-delete"
          small
          color="#ed4e62"
          nuxt
          >
            <v-icon color="#FFF">
              mdi-delete
            </v-icon> Excluir
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      listProducts: [],
      qtdItems: 0
    }
  },
  head () {
    return {
      title: 'SuperCart | Carrinho'
    }
  },
  beforeMount() {
    this.listProducts = this.$store.getters['cart']
    this.qtdItems = this.listProducts.length
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '~assets/variables.scss';

h5 {
  font-size: 16px;
  color: $font-color;
}

.container {
  margin-top: 28px;

  ul {
    list-style-type: none;
    padding-left: 0px;
  }
}

.loader {
  margin-top: 30px;
  margin-left: 45%;
}

.info {
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #000;
  padding-top: 12px;
  border-radius: 8px;
  padding-bottom: 30px;
  width: 100%;
  padding-left: 10px;
}

.products-grid {
  margin-top: 30px;

  a {
    text-decoration: none;
  }

  .card-product {
    border-radius: 1px;
    padding-top: 30px;
    padding: 20px;
    margin-bottom: 30px;
    background-color: white;
    height: 150px;
    transition: 0.2s;
    cursor: pointer;

    .btn-delete {
      color: #FFF;
      position: absolute;
      margin-top: 80px;
      margin-left: 62%;
    }

    .input-quant {
      width: 50px;
      position: absolute;
      margin-top: -90px;
      margin-left: 71%;
    }

    &:hover {
      box-shadow: 0px 10px 30px rgba(56, 50, 152, 0.1);
    }

    h5 {
      margin-top: 10px;
    }

    img {
      width: 90px;
    }

    button {
      margin-top: 10px;
    }

    .span-price {
      font-weight: 300;
      font-size: 15px;
      position: absolute;
      margin-top: 55px;
    }

    .span-title {
      font-size: 12px;
      margin-top: 25px;
      position: absolute;
    }

    span {
      color: $font-color;
      margin-left: 15px;
    }
  }
}
</style>
