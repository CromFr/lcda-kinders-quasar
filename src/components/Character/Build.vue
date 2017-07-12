<template>
  <div>
    <div class="toolbar dark">
      <q-toolbar-title :padding="1">
        <span v-for="(item, index) in character.classes">{{ item.name }} ({{ item.lvl }}) </span>
      </q-toolbar-title>
      <button @click="showSkills = false"><i>settings_power</i></button>
      <button @click="showSkills = true"><i>toc</i></button>
    </div>
    <div class="row" v-if="!showSkills" style="margin-top: 60px">
      <div class="gt-bg width-1of4"></div>
      <table class="q-table responsive horizontal-delimiter">
        <thead>
          <tr>
            <th class="text-left">Niv.</th>
            <th class="text-left">Classe</th>
            <th class="text-left">Caractéristique</th>
            <th class="text-left">Dons</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lvl, index) in leveling.feats" :style="{ background: color[leveling.classInfo[index].color] }">
            <td class="text-center" data-th="Niv.">
              {{ index + 1 }}
            </td>
            <td class="text-left" data-th="Classe">
              {{ leveling.classInfo[index].name }} ({{ leveling.classInfo[index].lvl }})
            </td>
            <td class="text-left" data-th="Caractéristique">
              {{ leveling.ability[index] }}
            </td>
            <td class="text-left" data-th="Dons">
              <div v-for="(feat, index) in lvl">
                {{ feat }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="gt-bg width-1of4"></div>
    </div>
    <div class="row" v-if="showSkills">
      <div class="gt-bg width-1of4"></div>
      <table class="q-table responsive horizontal-delimiter">
        <thead>
          <tr>
            <th class="text-left">Niv.</th>
            <th class="text-left">Classe</th>
            <th v-for="(name, index) in skillNames" class="text-left">{{ name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lvl, index) in leveling.skills" :style="{ background: color[leveling.classInfo[index].color] }">
            <td class="text-center" data-th="Niv.">
              {{ index + 1 }}
            </td>
            <td class="text-left" data-th="Classe">
              {{ leveling.classInfo[index].name }} ({{ leveling.classInfo[index].lvl }})
            </td>
            <td v-for="(s, index) in lvl" :data-th="s.name" class="text-left">
              <div v-if="s.valueDiff > 0">
                +{{ s.valueDiff }}({{ s.value }})
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="gt-bg width-1of4"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      showSkills: false,
      color: ['rgba(0,135,68,0.5)', 'rgba(0,87,231,0.5)', 'rgba(214,45,32,0.5)', 'rgba(255,167,0,0.5)']
    }
  },
  computed: {
    character () {
      return this.$store.getters.character(this.$route.params.bicFileName)
    },
    skillNames () {
      let used = _.filter(this.character.leveling[this.character.lvl - 1].skills, (o) => {
        return o.value > 0
      })
      let names = []
      for (let i in used) {
        names.push(used[i].name)
      }
      return names
    },
    leveling () {
      let helper = []
      let color = 0
      let classInfo = []
      let ability = []
      let feats = []
      let skills = []
      for (let i in this.character.leveling) {
        // class infos
        let className = this.character.leveling[i].className
        let cn = _.find(helper, { 'name': className })
        if (cn !== undefined) {
          cn.lvl++
        }
        else {
          helper.push({ name: className, lvl: 1, color: color++ })
        }
        let c = {
          name: className,
          lvl: _.find(helper, { 'name': className }).lvl,
          color: _.find(helper, { 'name': className }).color
        }
        classInfo.push(c)
        // abilities
        ability.push(this.character.leveling[i].ability)
        // feats
        feats.push(this.character.leveling[i].feats)
        // skills
        skills.push(_.filter(this.character.leveling[i].skills, (o) => {
          return _.indexOf(this.skillNames, o.name) > -1
        }))
      }
      return { classInfo: classInfo, ability: ability, feats: feats, skills: skills }
    }
  },
  methods: {
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
