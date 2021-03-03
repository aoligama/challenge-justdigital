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
        <img :src="product.picture" @error="setFallbackImageUrl">
        <span class="span-title">{{ product.title }}</span>
        <span class="span-price">R$ {{ product.price }}</span>

        <v-text-field
          class="input-quant"
          label="Qtd"
          disabled
          :value="product.quantity"
          type="number"
        ></v-text-field>

        <v-btn
          class="btn-delete"
          small
          text
          nuxt
          @click="deleteProduct(product.id)"
        >
          <v-icon color="#9191a0">
            mdi-delete
          </v-icon>
        </v-btn>

        <v-btn
          class="btn-add"
          small
          color="#056ff5"
          nuxt
          @click="add(product)"
        >
          <v-icon color="#FFF">
            mdi-plus-thick
          </v-icon>
        </v-btn>

        <v-btn
          class="btn-remove"
          small
          color="#ed4e62"
          nuxt
          @click="remove(product)"
        >
          <v-icon color="#FFF">
            mdi-minus-thick
          </v-icon>
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
  methods: {
    setFallbackImageUrl(event) {
      // função para adicionar imagem alternativa em caso de erros
      event.target.src = 'https://imagens.canaltech.com.br/produto/buscape/o292298908.jpg'
    },
    deleteProduct(productId){
      const cart = this.$store.getters['cart']
      let removeIndex = cart.map(product => product.id).indexOf(productId) // busca o index do produto no state do carrinho
      ~removeIndex && cart.splice(removeIndex, 1) // remove o produto e define um novo estado

      this.$store.commit('setCart', cart)

      this.$store.commit('showSnackbar', {
        text: 'Produto removido do carrinho',
        timeout: 3000,
        color: 'success'
      })

      this.$router.push({
        path: '/'
      })
    },
    success() {
      // quando o produto está em estoque
      this.$store.commit('showSnackbar', {
        text: 'Produto adicionado ao carrinho',
        timeout: 3000,
        color: 'success'
      })
    },
    error() {
      // quando o produto não está em estoque
      this.$store.commit('showSnackbar', {
        text: 'Oops! Nosso estoque está esgotado :(',
        timeout: 3000,
        color: 'error'
      })
    },
    checkInventory(id, prodQuantity) {

      let inventory = this.$store.getters['inventory']
      let quantity = inventory.find((el) => el.id === id ).quantity // verifica a quantidade do produto em estoque

      if(quantity >= prodQuantity) {
        return true
      } else {
        return false
      }
    },
    add(product) {
      
      let cart = this.$store.getters['cart']
      let currentCart = cart.find((el) => el.id === product.id )

      if(currentCart !== undefined) {
        let prodIndex = cart.findIndex((prod => prod.id == currentCart.id))

        // verificação do estoque
        if(this.checkInventory(product.id, cart[prodIndex].quantity + 1) ) {
          cart[prodIndex].quantity++ 
          this.success()
        } else {
          this.error()
        }
      }
      // atualiza o estado do carrinho
      this.$store.commit('setCart', cart)
    },
    remove(product) {
      let cart = this.$store.getters['cart']
      let currentCart = cart.find((el) => el.id === product.id )

      if(currentCart !== undefined) {
        let prodIndex = cart.findIndex((prod => prod.id == currentCart.id))

        // verifica se a quantidade será 0
        if(cart[prodIndex].quantity - 1 <= 0) {
          this.$store.commit('showSnackbar', {
            text: 'Oops! A quantidade do produto não pode ser zero',
            timeout: 5000,
            color: 'error'
          })
        } else {
          cart[prodIndex].quantity--
        }
      }

      // atualiza o estado do carrinho
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
    margin-bottom: 30px;
    background-color: white;
    height: 150px;
    transition: 0.2s;
    cursor: pointer;

    .btn-delete {
      position: absolute;
      margin-top: 0;
      margin-left: 68%;
    }

    .btn-add {
      color: #FFF;
      position: absolute;
      margin-top: 65px;
      margin-left: 60%;
    }

    .btn-remove {
      color: #FFF;
      position: absolute;
      margin-top: 65px;
      margin-left: 67%;
    }

    .input-quant {
      width: 40px;
      position: absolute;
      margin-top: -50px;
      margin-left: 70%;
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
