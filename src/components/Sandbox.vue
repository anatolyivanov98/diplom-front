<template>
  <div class="sandbox">
    <div class="col s12">
      <textarea name="" id="" cols="30" rows="10" placeholder="Введите код" v-model="code"></textarea>
    </div>
    <div class="col s12 sandbox-btn" >
      <button class="btn" @click="runCode">Запустить</button>
      <button class="btn red darken-1" @click="isResult = false" v-if="isResult">X</button>
    </div>
    <div class="col s12" v-if="isResult">
      <div class="result">
        <p v-for="res in result">{{res}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sandbox",
    data: () => ({
      code: '',
      result: '',
      isResult: false
    }),
    methods:{
      async runCode() {
        const arr = this.code.split("\n")
        const data = {}
        for (let i = 0; i < arr.length; i++) {
          data[`${i}`] = arr[i]
        }
        await this.$store.dispatch('sendCode', data)
        let result = this.$store.state.sandbox.result
        let arrResult = []
        if (this.result.user_stderr !== '') {
          arrResult = result.user_stderr.split('\n')
        } else {
          arrResult = result.user_stdout.split('\n')
        }

        this.result = arrResult
        this.isResult = true

      }
    }
  }
</script>

<style scoped lang="scss">
  .sandbox {
    display: flex;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    min-height: 300px;
    flex-direction: column;

    textarea {
      margin-top: 10px;
      padding: 5px;
      height: 250px;
      resize: none;
    }

    .sandbox-btn {
      display: flex;
      justify-content: space-between;
      button {
        margin: 10px 0 15px 0;
      }
    }

    .result {
      padding-left: 10px;
      border: 1px solid darkgrey;
      margin-bottom: 10px;
    }
  }
</style>