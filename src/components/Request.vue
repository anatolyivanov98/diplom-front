<template>
  <div class="request">
    <p>Вывести строки с заданными значениями столбца</p>
    <div>
      <div class="input-field col s4">
        <input id="column" type="text" v-model="column">
        <label for="column">Номер столбца</label>
      </div>
      <div class="input-field col s4">
        <select ref="select" v-model="operator">
          <option value="" disabled>Выберите оператор</option>
          <option value="=">=</option>
          <option value=">">></option>
          <option value="<"><</option>
          <option value=">=">>=</option>
          <option value="<="><=</option>
          <option value="!=">!=</option>
        </select>
        <label>Выберите оператор</label>
      </div>
      <div class="input-field col s4">
        <input id="value" type="text" v-model="value">
        <label for="value">Введите значения</label>
      </div>
    </div>
    <div class="apply">
      <button class="btn" @click="requestApply">Применить</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Request",
    data:() => ({
      column: '',
      operator: '',
      value: ''
    }),
    methods: {
      async requestApply() {
        if (this.column.length === 0) {
          M.toast({
            html: 'Выберите столбец',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        } else if (this.operator.length === 0) {
          M.toast({
            html: 'Выберите оператор',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        } else if (this.value.length === 0) {
          M.toast({
            html: 'Введите значение',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        } else if (this.column.length > 3) {
          M.toast({
            html: 'Введите двухзначное значение',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        } else if (this.column < 0) {
          M.toast({
            html: 'Введите  значение больше 0',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        }
        let formData = {
          column: this.column,
          operator: this.operator,
          value: this.value
        }
        await this.$store.dispatch('requestApply', formData)
        this.$emit('request')
      }
    },
    mounted() {
      M.FormSelect.init(this.$refs.select)
    }
  }
</script>

<style lang="scss" scoped>
  .request{
    display: flex;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    min-height: 200px;
    flex-direction: column;

    p {
      padding: 0 15px;
      font-size: 16px;
    }

    .apply {
      display: flex;
      justify-content: flex-end;
      padding: 15px;
    }
  }
</style>