<div class="col l12">
  <div class="table-chart">
    <canvas id="canvas"></canvas>
  </div>
</div>

<script>
  import {Bar} from 'vue-chartjs';
  export default {
    name: "ChartBar",
    data: () =>({
      chartData: ''
    }),
    extends: Bar,
    mounted() {
      this.chartData = this.$store.state.table.chartData
      const data = {
        labels: this.chartData.labels[1],
        datasets: [{
          label: this.chartData.header[1],
          data: this.chartData.data[1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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