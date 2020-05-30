import axios from 'axios'

export default {
  state: {
    table: ''
  },
  mutations: {
    setTable(state, table){
      state.table = table.data
    }
  },
  actions: {
    async requestApply({dispatch, commit}, formData) {
      console.log(formData)
      return new Promise((resolve, reject) => {
        axios.post( 'https://tusur.herokuapp.com/request',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(resp => {
          resolve(resp)
          commit('setTable', resp)
        })
          .catch(err => {
            reject(err)
            console.log(err)
          })
      })
    },
  }
}