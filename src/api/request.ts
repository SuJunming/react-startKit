import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let defaultUrl = ''
if (process.env.NODE_ENV == 'development') {
  defaultUrl = 'http://0.0.0.0:3000'
}
export default {
  post(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: defaultUrl + url,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
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
        url: defaultUrl + url,
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
