<template>
  <div class="request-table">
    <p>По данному запросу нашлось {{count + 1}} строк</p>
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
    async mounted() {
      this.table = await this.$store.state.request.table.data
      this.count = await this.$store.state.request.table.amountOfStr
    }
  }
</script>

<style lang="scss" scoped>
  .request-table {
    p {
      padding: 15px;
      font-size: 16px;
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