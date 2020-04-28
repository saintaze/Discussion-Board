import React, { useState } from 'react';
import { Comments } from '../api/comments.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const CommentsList = ({comments}) => {

  const [inputVal, setInputVal] = useState('');

  const handleInput = e => {
    setInputVal(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (inputVal.length) Meteor.call('comments.add', inputVal, Math.floor(Math.random() * 98) + 1);
    setInputVal('');
  }

  const renderComments = () => {
      return (
        <TransitionGroup component={null}>
          {comments.map(c => { 
            return <CSSTransition
              in={true}
              timeout={600}
              classNames="list"
              key={c._id}
              unmountOnExit
            >
              <div className="ui comments">
                <div className="comment">
                  <a className="avatar">
                    <img src="chris.jpg" />
                  </a>
                  <div className="content">
                    <a className="author">{c.userEmail}</a>
                    <div className="metadata">
                      <div className="date">{timeAgo.format(c.createdAt)}</div>
                      <div className="rating">
                        <i className="star icon"></i>
                        {c.faves} Faves
                    </div>
                    </div>
                    <div className="text">{c.text}</div>
                  </div>
                </div>
              </div>
            </CSSTransition >
           })}
        </TransitionGroup>
      )
  }

  if (!Meteor.userId()) return <Redirect to="/" />

  return (
    <div className="discussion">
      <h2 className="header">Discussion Board</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="ui form">
          <div className="field">
            <input type="text" placeholder="Share Comment" value={inputVal} onChange={handleInput} />
          </div>
        </div>
      </form>
      <div className="ui list">
        {renderComments()}
      </div>
    </div>
  )
};

export default withTracker(() => {
  Meteor.subscribe('allComments');
  return {
    comments: Comments.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(CommentsList);
