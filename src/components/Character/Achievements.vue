<template>
  <div>
    <div class="card">
      <div class="item two-lines">
        <i class="item-primary">starts</i>
        <div class="item-content">
          <div>
            <q-progress :percentage="progress"></q-progress>
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
              <td>{{ lvl }} / 30</td>
              <td>{{ lvl * lvlPts }} / {{ 30 * lvlPts }}</td>
            </tr>
            <tr>
              <td>Quêtes</td>
              <td>{{ questStats[2] }} / {{ questStats[3] }}</td>
              <td>{{ questStats[2] * questPts }} / {{ questStats[3] * questPts }}</td>
            </tr>
            <tr>
              <td>Kinders</td>
              <td>{{ kinderStats[5][0] }} / {{ kinderStats[5][1] }}</td>
              <td>{{ kinderStats[5][0] * kinderPts }}/{{ kinderStats[5][1] * kinderPts }}</td>
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
export default {
  data () {
    return {
      lvlPts: 2,
      questPts: 5,
      kinderPts: 3,
      secretPts: 6
    }
  },
  props: ['lvl', 'questStats', 'kinderStats'],
  computed: {
    progress () {
      let done = (this.lvl * this.lvlPts) + (this.questStats[2] * this.questPts) + (this.kinderStats[5][0] * this.kinderPts)
      let total = (30 * this.lvlPts) + (this.questStats[3] * this.questPts) + (this.kinderStats[5][1] * this.kinderPts)
      return (done / total) * 100
    }
  }
}
</script>

<style>
</style>
