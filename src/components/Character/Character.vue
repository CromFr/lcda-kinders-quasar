<template>
  <div>
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
      <div class="card-actions">
        <button
            class="warning"
            v-if="character.status === 'active'"
            @click="deactivate()">
          Désactiver
        </button>
        <button
            class="primary"
            v-if="character.status === 'inactive'"
            @click="activate()">
          Activer
        </button>
      </div>
    </div>
    <div class="card">
      <div class="item two-lines">
        <i class="item-primary">build</i>
        <div class="item-content">
          <div>
            <span v-for="(item, index) in character.classes">{{ item.name }} ({{ item.lvl }}) </span>
          </div>
          <div>
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
    <div class="card">
      <div class="item two-lines">
        <i class="item-primary">starts</i>
        <div class="item-content">
          <div>

          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <table class="q-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Progression</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Niveaux</td>
              <td>{{ character.lvl }} / 30</td>
              <td>{{ character.lvl }} / 30</td>
            </tr>
            <tr>
              <td>Quêtes</td>
              <td>{{ questStats[2] }} / {{ questStats[3] }}</td>
              <td>{{ questStats[2] * 4 }} / {{ questStats[3] * 4 }}</td>
            </tr>
            <tr>
              <td>Kinders</td>
              <td>{{ kinderStats[0][0] + kinderStats[1][0] + kinderStats[2][0] + kinderStats[3][0] + kinderStats[4][0] }}/{{ kinderStats[0][1] + kinderStats[1][1] + kinderStats[2][1] + kinderStats[3][1] + kinderStats[4][1] }}</td>
              <td>{{ (kinderStats[0][0] + kinderStats[1][0] + kinderStats[2][0] + kinderStats[3][0] + kinderStats[4][0]) * 2 }}/{{ (kinderStats[0][1] + kinderStats[1][1] + kinderStats[2][1] + kinderStats[3][1] + kinderStats[4][1]) * 2 }}</td>
            </tr>
            <tr>
              <td>Secrets</td>
              <td>???/???</td>
              <td>???/???</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'

export default {
  computed: {
    session () {
      return this.$store.getters.session
    },
    character () {
      return this.$store.getters.character(this.$route.params.bicFileName)
    },
    questStats () {
      return this.$store.getters.charStatsJournal(this.$route.params.bicFileName)
    },
    kinderStats () {
      return this.$store.getters.charStatsKinders(this.$route.params.bicFileName)
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
