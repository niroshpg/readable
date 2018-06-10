import React from 'react'
import { Route, Switch } from 'react-router'
import CategoryView from '../components/CategoryView'
import RootView from '../components/RootView'
import ToolBar from '../components/ToolBar'
import '../index.css'

const routes = (
  <div className="container">
    <ToolBar />
    <Switch>
      <Route exact path="/:category" component={CategoryView} />
      <Route component={RootView} />
    </Switch>
  </div>
)

export default routes
