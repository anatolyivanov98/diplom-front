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
        <div class="button-and-or">
          <button class="btn" :class="{'red lighten-1' :isActiveValueAnd2}" @click="activeValueAnd2">
            <span>И</span>
          </button>
          <button class="btn" :class="{'red lighten-1' :isActiveValueOr2}" @click="activeValueOr2">
            <span>ИЛИ</span>
          </button>
        </div>
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
        <div class="button-and-or">
          <button class="btn" :class="{'red lighten-1' :isActiveValueAnd3}" @click="activeValueAnd3">
            <span>И</span>
          </button>
          <button class="btn" :class="{'red lighten-1' :isActiveValueOr3}" @click="activeValueOr3">
            <span>ИЛИ</span>
          </button>
        </div>
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
      isActiveValueAnd2: false,
      isActiveValueOr2: false,
      isActiveValue3: false,
      isActiveValueAnd3: false,
      isActiveValueOr3: false
    }),
    methods: {
      activeValueAnd2() {
        if (this.isActiveValueOr2 && this.isActiveValue2) {
          this.isActiveValueAnd2 = !this.isActiveValueAnd2
          this.isActiveValueOr2 = false
        } else {
          this.isActiveValue2 = !this.isActiveValue2
          this.isActiveValueAnd2 = !this.isActiveValueAnd2
          this.isActiveValueOr2 = false
        }

        setTimeout(() => {
          M.FormSelect.init(this.$refs.select2)
        }, 0)
      },
      activeValueOr2() {
        if (this.isActiveValueAnd2 && this.isActiveValue2) {
          this.isActiveValueAnd2 = false
          this.isActiveValueOr2 = !this.isActiveValueOr2
        } else {
          this.isActiveValue2 = !this.isActiveValue2
          this.isActiveValueAnd2 = false
          this.isActiveValueOr2 = !this.isActiveValueOr2
        }

        setTimeout(() => {
          M.FormSelect.init(this.$refs.select2)
        }, 0)
      },
      activeValueAnd3() {
        if (this.isActiveValueOr3 && this.isActiveValue3) {
          this.isActiveValueAnd3 = !this.isActiveValueAnd3
          this.isActiveValueOr3 = false
        } else {
          this.isActiveValue3 = !this.isActiveValue3
          this.isActiveValueAnd3 = !this.isActiveValueAnd3
          this.isActiveValueOr3 = false
        }
        setTimeout(() => {
          M.FormSelect.init(this.$refs.select3)
        }, 0)
      },
      activeValueOr3() {
        if (this.isActiveValueAnd3 && this.isActiveValue3) {
          this.isActiveValueAnd3 = false
          this.isActiveValueOr3 = !this.isActiveValueOr3
        } else {
          this.isActiveValue3 = !this.isActiveValue3
          this.isActiveValueAnd3 = false
          this.isActiveValueOr3 = !this.isActiveValueOr3
        }
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
          isActiveValueAnd2: this.isActiveValueAnd2,
          isActiveValueOr2: this.isActiveValueOr2,
          isActiveValueAnd3: this.isActiveValueAnd3,
          isActiveValueOr3: this.isActiveValueOr3
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

    .button-and-or {
      display: flex;
      flex-direction: row;
      justify-content: center;

      button {
        margin: 5px;
      }
    }

    .apply {
      display: flex;
      justify-content: flex-end;
      padding: 15px;
    }
  }
</style>