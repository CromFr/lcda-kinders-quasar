<template>
  <q-drawer-link :class="{ 'myActive': path.indexOf(nav.path) >= 0 }" :to="{ path: path, exact: true }" replace>
    {{ item.name }}
  </q-drawer-link>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    path () {
      return '/' + this.item.status + '/' + this.item.bicFileName + this.nav.sub
    },
    nav () {
      return this.$store.getters.nav
    }
  }
}
</script>

<style lang="stylus">
.myActive {
  background: rgba(0,0,0,0.2);
}
</style>
