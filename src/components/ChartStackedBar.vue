<div class="col l12">
  <div class="table-chart">
    <canvas id="canvas"></canvas>
  </div>
</div>

<script>
  import {Bar} from 'vue-chartjs';
  export default {
    name: "ChartStackedBar",
    data: () =>({
      chartData: ''
    }),
    extends: Bar,
    mounted() {
      this.chartData = this.$store.state.table.chartData

      let counter = 0
      for( let n in this.chartData.header) {
        counter++
      }
       const Colors = [
        '#293a80',
        '#1eb2a6',
        '#537ec5',
        '#142850',
        '#00a8cc',
        '#60a9a6',
        '#ffa34d',
        '#ffd31d',
        '#574f7d',

        '#bb7171',
        '#c72c41',
        '#7189bf',
        '#574f7d',
        '#574f7d',
        '#574f7d',
        '#574f7d',
        '#574f7d',
        '#574f7d',
        '#574f7d'
      ]

      let dd = []
      for( let i = 0; i < counter; i++){
            dd[i] =  {label: this.chartData.header[i], data: this.chartData.data[i], backgroundColor:Colors[i] }
      }

      const chartOptions = {
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
            stacked: true
            }]
          },
          legend: {
            labels: {
              fontSize: 16
            }
          }
        }

      const allData = {
          labels: this.chartData.labels,
          datasets: dd
        }

      this.renderChart(allData, chartOptions)
      const canvas = document.querySelector('canvas')
      canvas.style.height = 67 + '%'
      canvas.style.width = 67 + '%'
      canvas.style.marginRight = 'auto'
      canvas.style.marginLeft = 'auto'
   }
}

</script>

<style scoped lang="scss">

</style>





