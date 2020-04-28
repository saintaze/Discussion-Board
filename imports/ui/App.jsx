import React from 'react';
import { Switch, Route } from "react-router-dom";
import CommentsList from './CommentsList';
import Auth from './Auth';
import Navbar from './Navbar';
import { withRouter } from "react-router";

const App = ({location}) => {
  const pageColorCls = location.pathname === '/' ?  'auth-bg-color' : '';
  return (
    <div className={pageColorCls}>
      <Navbar />
      <Switch>
        <div className="ui container">
          <Route exact path="/" component={Auth}/>
          <Route path="/discussion" component={CommentsList}/>
        </div>
      </Switch>
    </div>
  )
};

export default withRouter(App);

