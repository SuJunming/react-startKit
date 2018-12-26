import * as React from "react";
import {
  Route,
  Switch,
} from 'react-router-dom';
import Demo from "./component/demo";
const Status = ({ code, children }: any) => (
  <Route render={({ staticContext }: any) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

const NotFound = (): any => {
  <Status code={404}>
    <div>
      <h1>抱歉，页面消失了</h1>
    </div>
  </Status>
}

export default class Router extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path='/' component={Demo} />
        <Route path='/about' render={() => 'about'} />
        <Route path='/contact' render={() => 'contact'} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
