<template>
  <div class="statistic">
    <p>Выберите операцию и колонку для вычисления</p>
    <div>
      <div class="input-field col s6">
        <select ref="select1" v-model="operation">
          <option value="" disabled>Выберите операцию</option>
          <option value="Дисперсия">Дисперсия</option>
          <option value="Медиана">Медиана</option>
          <option value="Взвешенное среднее арифметическое">Взвешенное среднее арифметическое</option>
          <option value="Среденеквадратичное отклонение">Среденеквадратичное отклонение</option>
          <option value="Среднее арифметическое">Среднее арифметическое</option>
        </select>
        <label>Выберите операцию</label>
      </div>
      <div class="input-field col s6">
        <select ref="select2" v-model="column">
          <option value="" disabled>Выберите колонку</option>
          <option :value="i" v-for="i in list">{{i}}</option>
        </select>
        <label>Выберите оператор</label>
      </div>
    </div>
    <div class="apply">
      <button class="btn" @click="statisticApply">Вычислить</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Statistic",
    data:() =>({
      operation: '',
      column: '',
      list: ['1','2','3','4','5','6','7','8','9','10','11','12']
    }),
    methods: {
      async statisticApply() {
        if (this.operation.length === 0) {
          M.toast({
            html: 'Выберите операцию',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        } else if (this.column.length === 0) {
          M.toast({
            html: 'Выберите колонку',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        }

        let formData = {
          operation: this.operation,
          column: this.column
        }

        await this.$store.dispatch('statisticCalculate', formData)
      }
    },
    mounted() {
      M.FormSelect.init(this.$refs.select1)
      M.FormSelect.init(this.$refs.select2)
    }
  }
</script>

<style scoped lang="scss">
  .statistic {
    display: flex;
    margin: 15px 10px 10px 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    min-height: 200px;
    flex-direction: column;

    p {
      padding: 0 10px;
      font-size: 16px;
    }

    .apply {
      display: flex;
      justify-content: flex-end;
      padding: 15px;
    }
  }
</style>