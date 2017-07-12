<template>
  <div class="column" style="heigth: 100%">
    <div class="toolbar dark">
      <q-toolbar-title :padding="1">
          Personnages
      </q-toolbar-title>
      <button>
        <i>visibility</i>
        <q-popover ref="visibilityPop">
          <div class="list">
            <label class="item">
              <q-checkbox v-model="showActive"></q-checkbox>
              Actifs
            </label>
            <label class="item">
              <q-checkbox v-model="showInactive"></q-checkbox>
              Inactifs
            </label>
          </div>
        </q-popover>
      </button>
      <button @click="sync()">
        <i v-if="!loading">autorenew</i>
        <spinner v-if="loading" color="white" size="20"></spinner>
      </button>
    </div>
    <hidden-scrollbar class="auto">
      <div slot="scrollContent" class="list no-border item-delimiter">
        <hr v-if="showActive"/>
        <div class="list-label" v-if="showActive">Actifs ({{ characters.active.length }})</div>
        <hr v-if="showActive"/>
        <char-list-item
            v-for="(item, index) in characters.active"
            v-bind:key="index"
            v-bind:item="item"
            v-if="showActive">
        </char-list-item>
        <hr v-if="showInactive"/>
        <div class="list-label" v-if="showInactive">Inactifs ({{ characters.inactive.length }})</div>
        <hr v-if="showInactive"/>
        <char-list-item
            v-for="(item, index) in characters.inactive"
            v-bind:key="index"
            v-bind:item="item"
            v-if="showInactive">
        </char-list-item>
      </div>
    </hidden-scrollbar>
  </div>
</template>

<script>
import CharListItem from './CharListItem'
import api from '../../api/api'
import HiddenScrollbar from '../HiddenScrollbar'

export default {
  components: {
    CharListItem,
    HiddenScrollbar
  },
  data () {
    return {
      showActive: true,
      showInactive: true,
      loading: false
    }
  },
  computed: {
    session () {
      return this.$store.getters.session
    },
    characters () {
      return this.$store.getters.characters
    }
  },
  methods: {
    sync () {
      this.loading = true
      api.loadAll(this.session)
      .then((msg) => {
        console.log(msg)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.center {
  margin-left: 24px;
}
</style>
