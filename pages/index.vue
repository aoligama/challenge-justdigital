<template>
  <div class="content">
    <products-list />
  </div>
</template>

<script>
import ProductsList from '../components/ProductsList'

export default {
  data () {
    return {
    }
  },
  components: {
    ProductsList
  },
  head () {
    return {
      title: 'SuperCart | Produtos'
    }
  },
}
</script>