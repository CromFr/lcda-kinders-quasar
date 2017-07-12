<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('setNav', {
      character: false,
      path: '/home',
      sub: ''
    })
  }
}
</script>

<style>
</style>
