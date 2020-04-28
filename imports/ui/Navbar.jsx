import React from 'react';
import { withRouter } from "react-router";
import { withTracker } from 'meteor/react-meteor-data';

const Navbar = ({ history, currentUser }) => {

  const handleSignout = () => Meteor.logout(() => history.push('/'));

  return (
    <div className="ui small menu">
      <a className="item"><h2>Feeds App</h2></a>
      <a className="item">Home</a>
      <a className="item">About</a>
      {currentUser && (
        <div className="right menu">
          <div className="item">
            <div className="ui primary button" onClick={handleSignout}>Sign Out</div>
          </div>
        </div>
      )}
  </div>
  )
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(withRouter(Navbar));
