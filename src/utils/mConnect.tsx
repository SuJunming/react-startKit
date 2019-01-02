import { connect } from 'react-redux'
import * as React from 'react'
const MyFallbackComponent = props => (
  <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: '1em 0', fontSize: 0.8 }}>
    {props.error.message}
  </pre>
)
const connectRedux = (key: string, component: any) => {
  const mapState = (state: any) => ({
    data: state[key],
  })
  const mapDispatch = data => ({ ...data[key] })
  return connect(
    mapState,
    mapDispatch,
  )(component)
}
export const mConnect = (key: string, Component: any) => {
  class WithErrorHandler extends React.Component<any, any> {
    constructor(props) {
      super(props)

      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
      }
    }
    componentDidCatch(error, info) {
      this.setState({ hasError: true, error, errorInfo: info })
    }
    render() {
      if (this.state.hasError) {
        const { error, errorInfo } = this.state
        return <MyFallbackComponent {...this.props} error={error} errorInfo={errorInfo} />
      }
      return <Component {...this.props} />
    }
  }
  WithErrorHandler['displayName'] = `withErrorHandler(${Component.displayName})`
  return connectRedux(key, WithErrorHandler)
}
