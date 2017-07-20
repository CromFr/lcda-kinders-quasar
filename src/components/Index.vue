<template>
  <q-layout>
    <!-- Login -->
    <div v-if="!session.auth" class="layout-view">
      <login></login>
    </div>
    <!-- Header -->
    <div slot="header" class="toolbar" v-if="session.auth">
      <!-- opens left-side drawer using its ref -->
      <button @click="$refs.leftDrawer.open()" class="hide-on-drawer-visible">
        <i>face</i>
      </button>
      <q-toolbar-title :padding="0">
        <button @click="$router.replace({ path: '/home' })">Hello {{ session.account }}!</button>
      </q-toolbar-title>
      <button @click="reset()"><i class="on-left">input</i>Déconnexion</button>
    </div>
    <!-- Navigation Tabs -->
    <q-tabs slot="navigation" v-if="session.auth" class="navigation">
      <q-tab icon="home" route="/home" exact replace>Home</q-tab>
      <q-tab icon="info" :route="{ path: nav.path, exact: true }" replace v-if="nav.character">Récap</q-tab>
      <q-tab icon="build" :route="{ path: nav.path + '/build', exact: true }" replace v-if="nav.character">Build</q-tab>
      <q-tab icon="book" :route="{ path: nav.path + '/questlog', exact: true }" replace v-if="nav.character">Journal</q-tab>
      <q-tab icon="timeline" :route="{ path: nav.path + '/progress', exact: true }" replace v-if="nav.character">Kinders</q-tab>
    </q-tabs>
    <!-- Left-side Drawer -->
    <q-drawer ref="leftDrawer" v-if="session.auth">
      <left-drawer-content style="height: 100%"></left-drawer-content>
    </q-drawer>
    <!-- using subroutes for content -->
    <router-view class="layout-view" v-if="session.auth"></router-view>
  </q-layout>
</template>

<script>
import Login from './Login'
import LeftDrawerContent from './LeftDrawer/LeftDrawerContent'

export default {
  components: {
    Login,
    LeftDrawerContent
  },
  computed: {
    session () {
      return this.$store.getters.session
    },
    nav () {
      return this.$store.getters.nav
    }
  },
  methods: {
    reset () {
      this.$router.replace('/')
      this.$store.dispatch('purgeSession')
    }
  }
}
</script>

<style lang="stylus" scoped>
.navigation {
  margin-left: calc((100% / 2) - 181px);
}
</style>
