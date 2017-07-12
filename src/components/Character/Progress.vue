<template>
  <div class="column" style="heigth: 100%">
    <div class="toolbar dark">
      <q-toolbar-title :padding="1">
        Total {{ kinderStats[0][0] + kinderStats[1][0] + kinderStats[2][0] + kinderStats[3][0] + kinderStats[4][0] }}/{{ kinderStats[0][1] + kinderStats[1][1] + kinderStats[2][1] + kinderStats[3][1] + kinderStats[4][1] }}
      </q-toolbar-title>
      <button @click="toggleOrder()"><i>sort_by_alpha</i></button>
      <button>
        <i>visibility</i>
        <q-popover ref="visibilityPop">
          <div class="list">
            <label class="item">
              <q-checkbox v-model="showDone"></q-checkbox>
              Terminé
            </label>
            <label class="item">
              <q-checkbox v-model="showNotDone"></q-checkbox>
              En cours
            </label>
          </div>
        </q-popover>
      </button>
    </div>
    <table class="q-table loose responsive cell-delimiter" style="width: 100%">
      <thead>
        <tr>
          <th class="text-left text-primary donj">Donjon</th>
          <th class="text-left text-blue-grey-5 cells">Normal {{ kinderStats[0][0] }}/{{ kinderStats[0][1] }}</th>
          <th class="text-left text-cyan-5 cells">Difficile {{ kinderStats[1][0] }}/{{ kinderStats[1][1] }}</th>
          <th class="text-left text-yellow-7 cells">Épique {{ kinderStats[2][0] }}/{{ kinderStats[2][1] }}</th>
          <th class="text-left text-orange-5 cells">Légendaire {{ kinderStats[3][0] }}/{{ kinderStats[3][1] }}</th>
          <th class="text-left text-red-5 cells">Inimaginable {{ kinderStats[4][0] }}/{{ kinderStats[4][1] }}</th>
        </tr>
      </thead>
    </table>
    <hidden-scrollbar>
      <table slot="scrollContent" class="q-table loose responsive cell-delimiter" style="width: 100%">
        <tbody>
          <tr v-for="(dungeon, index) in dungeons" v-if="showDungeon(dungeon)">
            <td class="text-left bg-primary text-white donj" data-th="Donjon">
              {{ dungeon.name }}
            </td>
            <td class="text-center cells" data-th="Normal" :class="cellBG(dungeon, 0)">
              <i v-if="dungeon.lootedChests[0]">done</i>
            </td>
            <td class="text-center cells" data-th="Difficile" :class="cellBG(dungeon, 1)">
              <i v-if="dungeon.lootedChests[1]">done</i>
            </td>
            <td class="text-center cells" data-th="Épique" :class="cellBG(dungeon, 2)">
              <i v-if="dungeon.lootedChests[2]">done</i>
            </td>
            <td class="text-center cells" data-th="Légendaire"  :class="cellBG(dungeon, 3)">
              <i v-if="dungeon.lootedChests[3]">done</i>
            </td>
            <td class="text-center cells" data-th="Inimaginable" :class="cellBG(dungeon, 4)">
              <i v-if="dungeon.lootedChests[4]">done</i>
            </td>
          </tr>
        </tbody>
      </table>
    </hidden-scrollbar>
  </div>
</template>

<script>
import HiddenScrollbar from '../HiddenScrollbar'

export default {
  components: {
    HiddenScrollbar
  },
  data () {
    return {
      showDone: true,
      showNotDone: true,
      order: 'asc'
    }
  },
  computed: {
    dungeons () {
      let dun = this.$store.getters.character(this.$route.params.bicFileName).dungeons.slice()
      if (this.order === 'asc') {
        return dun
      }
      else {
        return dun.reverse()
      }
    },
    kinderStats () {
      return this.$store.getters.charStatsKinders(this.$route.params.bicFileName)
    }
  },
  methods: {
    showDungeon (dungeon) {
      let isDone
      for (let i in dungeon.lootedChests) {
        isDone = dungeon.lootedChests[i]
        if (!dungeon.lootedChests[i]) {
          break
        }
      }
      if (isDone) {
        return this.showDone
      }
      else {
        return this.showNotDone
      }
    },
    toggleOrder () {
      this.order = this.order === 'asc' ? 'desc' : 'asc'
    },
    cellBG (dungeon, cellDiff) {
      let disabled = dungeon.diffMax < cellDiff
      let open = dungeon.unlockedDiff >= cellDiff
      let closed = open ? false : dungeon.diffMax >= cellDiff
      return {
        'bg-faded': disabled,
        'bg-negative': closed,
        'bg-positive': open,
        'text-white': true
      }
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
.donj {
    width: 25%;
}

.cells {
  width: 15%;
}

@media (max-width:600px) {
  .donj {
    width: auto;
  }
  .cells {
    width: auto;
  }
}
</style>
