<template>
  <div class="column" style="heigth: 100%">
    <div class="toolbar dark">
      <q-toolbar-title :padding="1">
        {{ character.name }} ({{ character.lvl }})
      </q-toolbar-title>
      <button v-if="character.status === 'active'" @click="deactivate()">
        <i>delete</i>
      </button>
      <button v-if="character.status === 'inactive'" @click="activate()">
        <i>replay</i>
      </button>
    </div>
    <HiddenScrollbar>
      <div slot="scrollContent" class="row flex wrap">
        <div class="card">
          <div class="item two-lines">
            <i class="item-primary">face</i>
            <div class="item-content">
              <div>
                {{ character.name }} ({{ character.lvl }})
              </div>
              <div>
                <span v-for="(item, index) in character.classes">{{ item.name }} ({{ item.lvl }}) </span>
              </div>
            </div>
          </div>
          <div class="card-content">
            Race: {{ character.race }}<br />
            Dieu: {{ character.god }}<br />
            Alignement: {{ character.alignment.name }} ({{ character.alignment.law_chaos }}/{{ character.alignment.good_evil }})
          </div>
        </div>
        <div class="card">
          <div class="item">
            <i class="item-primary">build</i>
            <div class="item-content">
              <div>
                <span v-for="(item, index) in character.classes">{{ item.name }} ({{ item.lvl }}) </span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <table class="q-table cell-delimiter">
              <thead>
                <tr>
                  <th>Caractéristique</th>
                  <th>Valeur</th>
                  <th>Modificateur</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in character.abilities">
                  <td>
                    {{ item.label }}
                  </td>
                  <td>
                    {{ item.value }}
                  </td>
                  <td>
                    {{ Math.floor((item.value - 10) / 2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Achievements :lvl="character.lvl" :questStats="questStats" :kinderStats="kinderStats"></Achievements>
      </div>
    </HiddenScrollbar>
  </div>
</template>

<script>
import api from '../../api/api'
import Achievements from './Achievements'
import HiddenScrollbar from '../HiddenScrollbar'

export default {
  components: {
    HiddenScrollbar,
    Achievements
  },
  computed: {
    session () {
      return this.$store.getters.session
    },
    character () {
      return this.$store.getters.character(this.$route.params.bicFileName)
    },
    questStats () {
      return this.$store.getters.charQuestLogStats(this.$route.params.bicFileName)
    },
    kinderStats () {
      return this.$store.getters.charKindersStats(this.$route.params.bicFileName)
    }
  },
  methods: {
    deactivate () {
      api.deactivateChar(this.character, this.session)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    activate () {
      api.activateChar(this.character, this.session)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    setNav (path) {
      this.$store.dispatch('setNav', {
        character: true,
        path: path,
        sub: ''
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.setNav(to.path)
    next()
  },
  mounted () {
    this.setNav(this.$route.path)
  }
}
</script>

<style>
</style>
