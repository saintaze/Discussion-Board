import React, { useEffect } from 'react';
import AccountsUI from './AccountsUI';
import { Meteor } from 'meteor/meteor';
import { Redirect } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import { CSSTransition } from 'react-transition-group';



const Auth = props => {

  useEffect(() =>{
    Session.set('Meteor.loginButtons.dropdownVisible', true)
  }, [])

  return (
    <div>
      {props.currentUser && <Redirect to="/discussion" />}
      <CSSTransition
        in={true}
        timeout={600}
        classNames="auth"
        appear
      >
        <div className="auth-container">
          <AccountsUI />
        </div>
      </CSSTransition >
    </div>
  )
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(Auth);