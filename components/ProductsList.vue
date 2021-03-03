<template>
  <v-container class="my-12 container" flat>
    <v-row class="mr-0">
        <v-col>
            <h5>
                Celulares e Smartphones
            </h5>
        </v-col>
    </v-row>
    <v-row class="mr-0">
        <v-col>
            <small class="grey--text">{{qtdProducts}} Produtos</small>
        </v-col>
    </v-row>
    <v-row class="products-grid mr-0" v-if="!isLoading">
        <v-col cols="4" v-for="(product, index) in listProducts" :key="index">
            <div class="card-product">
                <img :src="product.picture">
                <span class="span-title">{{ product.title }}</span>
                <span class="span-price">R$ {{ product.price }}</span>
                <v-btn class="btn btn-buy" color="#36d33b">COMPRAR</v-btn>
            </div>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { products } from '../api'

export default {
  name: 'ProductsList',
  data () {
    return {
      qtdProducts: 0,
      listProducts: [],
      isLoading: false
    }
  },
  beforeMount() {
    this.isLoading = true
    products.get()
    .then((res) => {
        this.listProducts = res.data.products
        this.qtdProducts = res.data.products.length
    })
    .finally(() => {
        this.isLoading = false
    })
  }
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
    text-align: center;
    position: relative;
    margin-bottom: 30px;
    background-color: white;
    height: 320px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 10px 30px rgba(56, 50, 152, 0.1);
    }

    h5 {
      margin-top: 10px;
    }

    button {
      margin-top: 10px;
    }

    img {
      margin-bottom: 20px;
    }

    .span-price {
      font-weight: 300;
      font-size: 15px;
    }

    .span-title {
        height: 50px;
        font-size: 12px;
    }

    span {
      display: block;
      color: $font-color;
      
      &:last-of-type {
        margin-top: 30px;
      }
    }
  }
}
</style>
