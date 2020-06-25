import axios from 'axios'

export default {
  state: {
    statisticResult: []
  },
  mutations: {
    setCalculateResult(state, resp){
      state.statisticResult = resp.data
    }
  },
  actions: {
    async statisticCalculate({dispatch, commit}, formData) {
      return new Promise((resolve, reject) => {
        axios.post( 'https://tusur.herokuapp.com/statistics',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(resp => {
          resolve(resp)
          commit('setCalculateResult', resp)
        })
          .catch(err => {
            reject(err)
            console.log(err)
          })
      })
    }
  }
}