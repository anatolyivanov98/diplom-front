import axios from 'axios'

export default {
  state: {
    result: ''
  },
  mutations: {
    setResult(state, result){
      state.result = result
    }
  },
  actions: {
    async sendCode({dispatch, commit}, formData) {
      console.log(formData)
      // return new Promise((resolve, reject) => {
      //   axios.post( 'https://tusur.herokuapp.com/request',
      //     formData,
      //     {
      //       headers: {
      //         'Content-Type': 'multipart/form-data'
      //       }
      //     }
      //   ).then(resp => {
      //     resolve(resp)
      //     commit('setResult', resp)
      //   })
      //     .catch(err => {
      //       reject(err)
      //       console.log(err)
      //     })
      // })
    }
  }
}
