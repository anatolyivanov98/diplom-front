<template>
  <div class="request-table">
    <div class="table-info">
      <p>По данному запросу нашлось {{count + 1}} строк</p>
      <div class="info-btn">
        <button class="btn" @click="saveRequestTable">Сохранить таблицу</button>
        <button class="btn red darken-1" @click="closeRequestTable"><i class="material-icons">close</i></button>
      </div>
    </div>
    <div class="table-body">
      <table>
        <tr v-for="i in table">
          <td v-for="j in i" >{{j}}</td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RequestTable",
    data:() => ({
      table: '',
      count: '',
    }),
    methods: {
      closeRequestTable() {
        this.$emit('close')
      },
      async saveRequestTable() {
        let formData = {
          saveRequestTable: true,
          saveMainTable: false
        }
        await this.$store.dispatch('saveRequestTable', formData)
      }
    },
    async mounted() {
      this.table = await this.$store.state.request.table.data
      this.count = await this.$store.state.request.table.amountOfStr
    }
  }
</script>

<style lang="scss" scoped>
  .request-table {
    .table-info {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      p {
        /*padding: 15px;*/
        font-size: 16px;
      }
      .info-btn {
        button {
          margin: 10px;
        }
      }
    }
    .table-body {
      padding: 0 10px;
      overflow: scroll;
      max-height: 500px;
      margin-bottom: 30px;
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
        .grey {
          background-color: grey;
        }
      }
    }
  }
</style>