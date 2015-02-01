###
Meteor.subscribe('tasks');
Meteor.subscribe('people');
###

Meteor.startup( ->
)


Handlebars.registerHelper("TITLE", (title) ->
  if (title)
    document.title = title
  else
    document.title = "Job Jars"
)

Template.chores.events({
  'click #addTask': (event) ->
    $('#newTask').toggle()
  ,
  'click .portlet-toggle': (event) ->
    icon = $(this)
    icon.toggleClass("ui-icon-minusthick ui-icon-plusthick")
    icon.closest(".portlet").find(".portlet-content").toggle()
})

Template.chores.rendered = ->
  $('#newTask').hide()

Template.myChores.rendered = ->

Template.choresDone.helpers(
  'choresDone': ->
      return Tasks.find({'status': 'Done'})
)

Template.myChores.helpers(
  'tasks': ->
    return Tasks.find()
  ,
  'mines': ->
  ,
  'dones': ->
)

Template.myChores.events (
  'dragstart .chore': (e) ->
      e.dataTransfer = e.originalEvent.dataTransfer
      e.dataTransfer.setData('text', e.target.id)
  ,
  'dragover #available-chores,#jar,#mine': (e) ->
      e.preventDefault();
  ,
  'drop #available-chores,#jar,#mine': (e) ->
      e.dataTransfer = e.originalEvent.dataTransfer
      id = e.dataTransfer.getData('text')
      elementID = document.getElementById(id)
      if (['jar', 'mine', 'available-chores'].indexOf(e.target.id) >= 0)
          e.target.appendChild(elementID)
          targetID = e.target.id
      else
          e.target.parentNode.appendChild(elementID)
          targetID = e.target.parentNode.id

      switch targetID
          when 'mine' then break
          when 'jar' then break
          when 'available-chores' then break
          else alert('Invalid choice. You shouldn\'t reach this')

      e.preventDefault()
)

Template.children.events(
    'click #addChild' : (event) ->
    $('#newChild').toggle()
)

Template.children.helpers(
    'child': ->
        return People.find()
)

Template.children.rendered = ->
    $('#newChild').hide()
