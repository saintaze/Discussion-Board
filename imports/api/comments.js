import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  Meteor.publish('allComments', () => {
    return Comments.find({})
  });
}

Meteor.methods({
  'comments.add'(text, faves) {
    check(text, String);
    check(faves, Number);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.insert({
      text: text,
      createdAt: new Date(),
      user: this.userId,
      faves: faves,
      userEmail: Meteor.users.findOne(this.userId).emails[0].address 
    });
  }
})