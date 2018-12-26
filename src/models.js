import { request, Api } from './api'
export const count = {
  state: 0,
  reducers: {
    addBy(state, payload) {
      return state + payload
    },
  },
  effects: dispatch => ({
    async addByAsync() {
      await request.post(Api.test)
      dispatch.count.addBy(1)
    },
  }),
}
