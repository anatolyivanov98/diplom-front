<template>
  <div class="container">
    <div class="row tables">
      <div v-if="loader" class="center col l12 preloader">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
          </div>
        </div>
      </div>

        <div v-else class="table-main">
          <div class="table-button">
            <div class="table-button-1">
              <button class="btn" @click="openAction">Предварительная обработка данных</button>
              <button class="btn" @click="openChooseChart">График</button>
              <button class="btn" @click="openRequest">Запросы</button>
              <button class="btn" @click="openSandbox">Песочница</button>
            </div>
            <div class="table-button-2">
              <button class="btn light-blue" @click="uploadNewFile">Загрузить новый файл</button>
              <button class="btn" @click="openStatistic">Статистические характеристики столбцов</button>
            </div>
          </div>

          <ChangeTable v-if="action" @changetable="changeTable"/>

          <ChooseChart v-if="isChooseChart" @choose="chooseChartHandler"/>

          <div class="table-chart" v-if="isChartLine">
            <ChartLine />
          </div>

          <div class="table-chart" v-if="isChartBar">
            <ChartBar/>
          </div>

          <div class="table-chart" v-if="isChartPie">
            <ChartPie />
          </div>

          <div class="table-chart" v-if="isChartStackedBar">
            <ChartStackedBar />
          </div>

          <Request v-if="isRequest" @request="requestHandler"/>

          <RequestTable v-if="isRequestTable" @close="closeRequestTable"/>

          <Sandbox v-if="isSandbox"/>

          <Statistic v-if="isStatistic"/>

          <div class="table-save">
            <button class="btn" @click="saveMainTable">Сохранить основную таблицу</button>
          </div>
          <div class="table-body">
            <table>
              <tr v-for="i in file">
                  <td v-for="j in i" >{{j}}</td>
              </tr>

            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import ChartLine from "../components/ChartLine";
  import ChartBar from "../components/ChartBar";
  import ChartPie from "../components/ChartPie";
  import ChooseChart from "../components/ChooseChart";
  import ChangeTable from "../components/ChangeTable";
  import ChartStackedBar from "../components/ChartStackedBar";
  import Request from "../components/Request";
  import RequestTable from "../components/RequestTable";
  import Sandbox from "../components/Sandbox";
  import Statistic from "../components/Statistic";

  export default {
    name: 'tables',
    components: {
      ChangeTable,
      ChartLine,
      ChartBar,
      ChartPie,
      ChartStackedBar,
      ChooseChart,
      Request,
      RequestTable,
      Sandbox,
      Statistic
    },
    data:()=>({
      loader: true,
      file: '',
      action: false,
      isChooseChart: false,
      isChartLine: false,
      isChartBar:false,
      isChartPie: false,
      isChartStackedBar: false,
      isRequest: false,
      isRequestTable: false,
      isSandbox: false,
      isStatistic: false
    }),
    methods: {
      uploadNewFile() {
        this.$router.push('/')
      },
      async saveMainTable() {
        let formData = {
          saveRequestTable: false,
          saveMainTable: true
        }
        await this.$store.dispatch('saveRequestTable', formData)
      },
      // Блок action
      async openAction() {
        this.action = !this.action
        this.isChooseChart = false
        this.isChartLine = false
        this.isChartPie = false
        this.isChartBar = false
        this.isRequest = false
        this.isChartStackedBar = false
        this.isSandbox = false
        this.isStatistic = false
      },
      async changeTable() {
        this.action = !this.action
        this.loader = true
        this.file = this.$store.state.table.file.data
        console.log(this.file)
        setTimeout(() => {
          if (this.file.length !== 0) {
            this.loader = false
          }
        }, 500)
      },
      // Блок Chart
      openChooseChart() {
        this.isChartLine = false
        this.isChartPie = false
        this.isChartBar = false
        this.action = false
        this.isChartStackedBar = false
        this.isRequest = false
        this.isSandbox = false
        this.isStatistic = false
        this.isChooseChart = !this.isChooseChart
      },
      chooseChartHandler() {
        this.isChooseChart = !this.isChooseChart
        let chartType = this.$store.state.table.chartData
        if (chartType.GraphType === 'Line') {
          this.isChartLine = true
        } else if (chartType.GraphType === 'Bar') {
          this.isChartBar = true
        } else if(chartType.GraphType === 'Pie') {
          this.isChartPie = true
        } else if(chartType.GraphType === 'StackedBar') {
          this.isChartStackedBar = true
        }
      },
      //  Блок Request
      openRequest() {
        this.isRequest = !this.isRequest
        this.isChartLine = false
        this.isChartPie = false
        this.isChartBar = false
        this.action = false
        this.isChartStackedBar = false
        this.isChooseChart = false
        this.isRequestTable = false
        this.isSandbox = false
        this.isStatistic = false
      },
      requestHandler() {
        this.isRequest = !this.isRequest
        this.isRequestTable = !this.isRequestTable
      },
      closeRequestTable() {
        this.isRequestTable = false
      },
      // Блок Sandbox
      openSandbox() {
        this.isSandbox = !this.isSandbox
        this.isChooseChart = false
        this.isChartLine = false
        this.isChartPie = false
        this.isChartBar = false
        this.isRequest = false
        this.isChartStackedBar = false
        this.action = false
        this.isStatistic = false
      },
      // Блок Statistic
      openStatistic() {
        this.isStatistic = !this.isStatistic
        this.isSandbox = false
        this.isChooseChart = false
        this.isChartLine = false
        this.isChartPie = false
        this.isChartBar = false
        this.isRequest = false
        this.isChartStackedBar = false
        this.action = false
      }
    },
    mounted() {
      this.file = this.$store.state.table.file.data
      setTimeout(() => {
        if (this.file.length !== 0) {
          this.loader = false
        }
      }, 500)
    }
  }
</script>

<style lang="scss" scoped>
  .tables{
    min-height: 600px;
    margin-top: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    .preloader {
      padding-top: 200px;
    }
    .table-main {
      .table-button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 4px 5px rgba(0,0,0,0.3);

        .table-button-1 {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          height: 60px;
        }
        .table-button-2 {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          height: 70px;
        }
      }
      .table-chart {
        margin: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        height: 600px;
        overflow: scroll;
      }

      .table-save {
        display: flex;
        justify-content: flex-end;
        margin: 15px 15px;
      }

      .table-body {
        padding: 0 10px;
        overflow: scroll;
        height: 500px;
        margin-bottom: 0;

        table {
          tr:first-child{
            background-color: lightgrey;
          }
          td{
            border: 1px solid darkgrey;
          }
          td:first-child {
            background-color: lightgrey;
          }
          td:hover{
            background-color: rgba(230, 230, 230, 0.5);
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
          }
          .grey {
            background-color: grey;
          }
        }
      }
    }
  }
</style>