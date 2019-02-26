import { request, Api } from '../api'
export const demo = {
  state: {
    data: 0,
  },
  reducers: {
    getData(state, payload) {
      return { data: state.data + 1 }
    },
  },
  effects: dispatch => ({
    getByAsync: async params => {
      const data = await request.post(Api.test)
      dispatch.demo.getData(data)
    },
  }),
}
