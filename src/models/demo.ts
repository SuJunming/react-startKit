import { request, Api } from '../api'
export const demo = {
  state: {
    data: {},
  },
  reducers: {
    getData(state, payload) {
      return { ...payload }
    },
  },
  effects: dispatch => ({
    getByAsync: async params => {
      const data = { data: params }
      dispatch.demo.getData(data)
    },
  }),
}
