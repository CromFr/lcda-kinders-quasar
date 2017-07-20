<template>
  <q-drawer-link
      :class="{ 'myActive': path.indexOf(nav.path) >= 0 }"
      :to="{ path: path, exact: true }"
      replace
      @click.native="test()">
    {{ item.name }}
  </q-drawer-link>
</template>

<script>
import api from '../../api/api'

export default {
  props: ['item'],
  computed: {
    path () {
      return '/' + this.item.status + '/' + this.item.bicFileName + this.nav.sub
    },
    nav () {
      return this.$store.getters.nav
    }
  },
  methods: {
    test () {
      api.getDetails({ char: this.item, session: this.$store.getters.session })
      .then((response) => {
        this.$store.dispatch('setQuestLog', {
          bicFileName: this.item.bicFileName,
          questLog: response.data.journal
        })
        this.$store.dispatch('setKinders', {
          bicFileName: this.item.bicFileName,
          kinders: response.data.dungeons
        })
        this.$store.dispatch('setLeveling', {
          bicFileName: this.item.bicFileName,
          leveling: response.data.leveling
        })
        this.$store.dispatch('setCharacter', {
          bicFileName: this.item.bicFileName,
          character: {
            abilities: response.data.abilities,
            alignment: response.data.alignment,
            classes: response.data.classes,
            god: response.data.god,
            lvl: response.data.lvl,
            name: response.data.name,
            race: response.data.race,
            status: this.item.status
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus">
.myActive {
  background: rgba(0,0,0,0.2);
}
</style>
