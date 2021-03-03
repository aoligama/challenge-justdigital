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
        <small class="grey--text">{{ qtdProducts }} Produtos</small>
      </v-col>
    </v-row>
    <v-row class="products-grid mr-0" v-if="!isLoading">
      <v-col cols="4" v-for="(product, index) in listProducts" :key="index">
        <div class="card-product">
          <img :src="product.picture" @error="setFallbackImageUrl">
          <span class="span-title">{{ product.title }}</span>
          <small class="caption grey--text">{{ product.brand }}</small>
          <span class="span-price">R$ {{ product.price }}</span>
          <v-btn class="btn btn-buy" color="#36d33b" @click="addToCart(product)">comprar</v-btn>
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
      this.buildInventory()
    })
    .finally(() => {
      this.isLoading = false
    })
  },
  methods: {
    buildInventory() {
      let inventory = []
      for(let product of this.listProducts){
        inventory.push({
          id: product.id,
          quantity: product.quantity
        })
      }
      this.$store.commit('setInventory', inventory)
    },
    setFallbackImageUrl(event) {
      event.target.src = 'https://imagens.canaltech.com.br/produto/buscape/o292298908.jpg'
    },
    checkInventory(id, prodQuantity) {
      let inventory = this.$store.getters['inventory']
      let quantity = inventory.find((el) => el.id === id ).quantity

      if(quantity >= prodQuantity) {
        return true
      } else {
        return false
      }
    },
    addToCart(product) {
      let cart = this.$store.getters['cart']
      let currentCart = cart.find((el) => el.id === product.id )

      if(currentCart !== undefined) {
        let prodIndex = cart.findIndex((prod => prod.id == currentCart.id))

        if(this.checkInventory(product.id, cart[prodIndex].quantity + 1) ) {
          cart[prodIndex].quantity++ 
          this.$store.commit('showSnackbar', {
            text: 'Produto adicionado ao carrinho',
            timeout: 3000,
            color: 'success'
          })
        } else {
          this.$store.commit('showSnackbar', {
            text: 'Oops! Nosso estoque está esgotado :(',
            timeout: 3000,
            color: 'error'
          })
        }
        
      } else {
        product.quantity = 1
        cart.push(product)
        this.$store.commit('showSnackbar', {
          text: 'Produto adicionado ao carrinho',
          timeout: 3000,
          color: 'success'
        })
      }

      this.$store.commit('setCart', cart)
      
    }
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
    height: 340px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 10px 30px rgba(56, 50, 152, 0.1);
    }

    .btn-buy {
        width: 200px;
        color: #FFF;
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
