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
        <button class="btn" :class="{'red lighten-1' :isActiveValue2}" @click="activeValue2">
          <span v-if="isActiveValue2">Удалить критерий</span>
          <span v-else>Добавить критерий</span>
        </button>
      </div>
      <div class="input-field col s4">
        <input id="value" type="text" v-model="value">
        <label for="value">Введите значения</label>
      </div>
    </div>
    <div v-if="isActiveValue2">
      <div class="input-field col s4">
        <input id="column2" type="text" v-model="column2">
        <label for="column">Номер столбца</label>
      </div>
      <div class="input-field col s4">
        <select ref="select2" v-model="operator2">
          <option value="" disabled>Выберите оператор</option>
          <option value="=">=</option>
          <option value=">">></option>
          <option value="<"><</option>
          <option value=">=">>=</option>
          <option value="<="><=</option>
          <option value="!=">!=</option>
        </select>
        <label>Выберите оператор</label>
        <button class="btn" :class="{'red lighten-1' :isActiveValue3}" @click="activeValue3">
          <span v-if="isActiveValue3">Удалить критерий</span>
          <span v-else>Добавить критерий</span>
        </button>
      </div>
      <div class="input-field col s4">
        <input id="value2" type="text" v-model="value2">
        <label for="value">Введите значения</label>
      </div>
    </div>
    <div v-if="isActiveValue3">
      <div class="input-field col s4">
        <input id="column3" type="text" v-model="column3">
        <label for="column">Номер столбца</label>
      </div>
      <div class="input-field col s4">
        <select ref="select3" v-model="operator3">
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
        <input id="value3" type="text" v-model="value3">
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
      column2: '',
      column3: '',
      operator: '',
      operator2: '',
      operator3: '',
      value: '',
      value2: '',
      value3: '',
      isActiveValue2: false,
      isActiveValue3: false
    }),
    methods: {
      activeValue2() {
        this.isActiveValue2 = !this.isActiveValue2
        setTimeout(() => {
          M.FormSelect.init(this.$refs.select2)
        }, 0)
      },
      activeValue3() {
        this.isActiveValue3 = !this.isActiveValue3
        setTimeout(() => {
          M.FormSelect.init(this.$refs.select3)
        }, 0)
      },
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
        } else if (((this.column.length !== 0 && this.column2.length !== 0 ) && (this.column === this.column2))
          || ((this.column === this.column3) && (this.column.length !== 0 && this.column3.length !==0))
          || ((this.column2 === this.column3)&&(this.column2.length!==0 && this.column3.length!==0))) {
          M.toast({
            html: 'Введите разные столбцы',
            displayLength: 2000,
            classes: 'red accent-4'
          })
          return
        }
        let formData = {
          column: this.column,
          column2: this.column2,
          column3: this.column3,
          operator: this.operator,
          operator2: this.operator2,
          operator3: this.operator3,
          value: this.value,
          value2: this.value2,
          value3: this.value3,
        }
        await this.$store.dispatch('requestApply', formData)
        this.$emit('request')
        this.column = '',
        this.column2 = '',
        this.column3 = '',
        this.operator = '',
        this.operator2 = '',
        this.operator3 = '',
        this.value = '',
        this.value2 = '',
        this.value3 = '',
        this.isActiveValue2 = false,
        this.isActiveValue3 = false
      },

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