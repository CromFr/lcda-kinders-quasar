<template>
  <div class="column" style="heigth: 100%">
    <div class="toolbar dark">
      <q-toolbar-title :padding="1">
        <i>visibility_off</i> {{ questStats[0] }}/{{ questStats[3] }} <i>directions_run</i>{{ questStats[1] }}/{{ questStats[3] }} <i>done</i>{{ questStats[2] }}/{{ questStats[3] }}
      </q-toolbar-title>
      <button @click="toggleOrder()"><i>sort_by_alpha</i></button>
      <button>
        <i>visibility</i>
        <q-popover ref="visibilityPop">
          <div class="list">
            <label class="item">
              <q-checkbox v-model="stateVisibility[0]"></q-checkbox>
              Non découverte
            </label>
            <label class="item">
              <q-checkbox v-model="stateVisibility[1]"></q-checkbox>
              En cours
            </label>
            <label class="item">
              <q-checkbox v-model="stateVisibility[2]"></q-checkbox>
              Terminé
            </label>
          </div>
        </q-popover>
      </button>
    </div>
    <hidden-scrollbar class="auto">
      <div slot="scrollContent" class="list no-border item-delimiter">
        <q-collapsible
          v-for="(item, index) in questLog"
          :key="index"
          :icon="stateIcons[item.state]"
          :label="item.name"
          group="questLog"
          v-if="stateVisibility[item.state]"
          >
          <div>
            priority: {{ item.priority }} <br />
            {{ item.description }}
          </div>
        </q-collapsible>
      </div>
    </hidden-scrollbar>
  </div>
</template>

<script>
import HiddenScrollbar from '../HiddenScrollbar'
import _ from 'lodash'

export default {
  components: {
    HiddenScrollbar
  },
  data () {
    return {
      stateIcons: ['visibility_off', 'directions_run', 'done'],
      stateVisibility: [true, true, true],
      order: 'asc',
      range: { min: 1, max: 30 }
    }
  },
  computed: {
    questLog () {
      let log = this.$store.getters.character(this.$route.params.bicFileName).journal
      return _.orderBy(log, ['name'], [this.order])
    },
    questStats () {
      return this.$store.getters.charStatsJournal(this.$route.params.bicFileName)
    }
  },
  methods: {
    toggleOrder () {
      this.order = this.order === 'asc' ? 'desc' : 'asc'
    },
    setNav (path) {
      let params = path.split('/')
      this.$store.dispatch('setNav', {
        character: true,
        path: '/' + params[1] + '/' + params[2],
        sub: '/' + params[3]
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

<style scoped>
</style>
