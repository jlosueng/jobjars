Meteor.publish "tasks", (user) ->
  return Tasks.find({'userId': user})


Meteor.publish "children", ->
  return People.find({'type': 'child', 'childOf': this.userId})

Meteor.publish "parents", ->
  return People.find({'type': 'parent', 'userId': this.userId})
