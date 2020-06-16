<div class="col l12">
  <div class="table-chart">
    <canvas id="canvas"></canvas>
  </div>
</div>

<script>
  import {Line} from 'vue-chartjs';
  export default {
    name: "ChartLine",
    data: () =>({
      chartData: ''
    }),
    extends: Line,
    mounted() {
      this.chartData = this.$store.state.table.chartData
      const data = {
        labels: this.chartData.labels[1],
        datasets: [{
          label: this.chartData.header[1],
          data: this.chartData.data[1],

          borderColor: [
            '#015668',

          ],
          borderWidth: 1
        }]
      }
      const options = {
        defaultFontSize: 16,
        legend: {
          labels: {
            fontSize: 16
          }
        }
      }
      this.renderChart(data, options)
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