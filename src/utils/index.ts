import { connect } from 'react-redux'
export const mConnect = (key: string, component: any) => {
  const mapState = (state: any) => ({
    data: state[key],
  })
  const mapDispatch = data => ({ ...data[key] })
  return connect(
    mapState,
    mapDispatch,
  )(component)
}
