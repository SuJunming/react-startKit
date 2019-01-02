import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Progress } from 'antd-mobile'
const lazy = React.lazy
const Suspense = React.Suspense
const Status = ({ code, children }: any) => (
  <Route
    render={({ staticContext }: any) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)

const NotFound = (): any => (
  <Status code={404}>
    <div>
      <h1>抱歉，页面消失了</h1>
    </div>
  </Status>
)

export default class Router extends React.PureComponent {
  state = {
    percent: 100,
  }
  render() {
    const { percent } = this.state
    return (
      <Suspense fallback={<Progress percent={percent} position="fixed" appearTransition />}>
        <Switch>
          <Route exact path="/" render={() => 'start'} />
          <Route path="/test" component={lazy(() => import('./demo'))} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    )
  }
}
