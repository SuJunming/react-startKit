import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default {
  post(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: window.origin + url,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return resolve(response)
        })
        .then(res => {
          return reject(res)
        })
    })
  },
  get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: window.origin + url,
        params,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(response => {
          return resolve(response)
        })
        .then(res => {
          return reject(res)
        })
    })
  },
}
