<template>
  <v-app light>
    <div>
      <Header v-if="render" />
      <v-main v-if="render" class="white">
        <nuxt />
        <v-snackbar v-model="snackbar.show" :top="snackbar.top" :timeout="snackbar.timeout" :color="snackbar.color" multi-line>
          <h3 class="font-weight-thin">
            {{ snackbar.text }}
          </h3>
          <template #action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
            >
              <h3 class="font-weight-thin">
                {{ snackbar.textclose }}
              </h3>
            </v-btn>
          </template>
        </v-snackbar>
      </v-main>
    </div>
  </v-app>
</template>

<script>

import Header from '../components/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      render: false
    }
  },
  computed: {
    snackbar () {
      return this.$store.getters.snackbar
    }
  },
  mounted () {
    this.render = true
  }
}
</script>
