<template>
    <div fluid class="white ma-0 pa-0" >
        <v-toolbar color="white" style="width: 100% !important">
            <v-toolbar-title>
                <nuxt-link to="/">
                    <span>SuperCart</span>
                </nuxt-link>
            </v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      tab: null,
      drawer: false,
    }
  }
}
</script>

<style lang="scss" scoped>

.elevation {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
}
a {
  text-decoration: none;
}
</style>
