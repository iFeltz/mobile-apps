<template>
  <div class="home">
    <tabs :items="apps" />
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import tabs from '@/components/tabs'

export default {
  name: 'home',
  components: {
    tabs
  },

  mounted () {
    this.fetchData()
  },

  computed: {
    apps () {
      return this.$store.state.data
    }
  },

  methods: {
    async fetchData () {
      await store.dispatch('fetchData')
    }
  }
}
</script>

<style lang="scss">
  .home {
    padding: 50px;

    @include adopt($sm) {
      padding: 20px;
    }
  }
</style>
