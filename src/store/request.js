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
    async saveRequestTable({dispatch , commit}, formData) {
      return new Promise((resolve, reject) => {
        axios.post( 'https://tusur.herokuapp.com/fileSave',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(resp => {
          resolve(resp)
          const fileURL = window.URL.createObjectURL(new Blob([resp.data]));
          const fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'file.csv');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
          .catch(err => {
            reject(err)
            console.log(err)
          })
      })
    },
  }
}
