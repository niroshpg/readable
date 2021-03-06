import React from 'react'
import { Route, Switch } from 'react-router'
import CategoryView from '../components/CategoryView'
import RootView from '../components/RootView'
import ToolBar from '../components/ToolBar'
import PostDetails from '../components/PostDetails'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import '../index.css'

const routes = (
  <div className="container">
    <ToolBar />
    <Switch>
      <Route exact path="/create" component={CreatePost} />
      <Route exact path="/edit" component={EditPost} />
      <Route exact path="/:category" component={CategoryView} />
      <Route exact path="/:category/:post" component={PostDetails} />
      <Route component={RootView} />
    </Switch>
  </div>
)

export default routes
