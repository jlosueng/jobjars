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

Template.rewardsEarned.rendered = ->

Template.rewardsEarned.events(
    'click .btn': (e, t) ->
        e.preventDefault()
        alert('Reward button clicked')
)

Template.addTask.events(
    'submit': ->
        alert($('#taskDesc').val())
)

Template.addChild.events()

Template.addChild.events(
    'click #btnAddChild' : (e, t) ->
        e.preventDefault();
        name = t.find('#childName').value
        dob = t.find('#childDob').value
        userId = Meteor.userId();
        People.insert({'userID': userId, 'name': name, 'dob':dob})
        container = $('#newChild');
        container.hide();
,
    'click .closeBox' : (e) ->
        e.preventDefault();
        ###
        container = $('#newChild')
        container.hide();
        ###
        $('#newChild').hide()
)

Template.login.events(
      'click #btnLoginGoogle' : (e, t) ->
          e.preventDefault()
          alert('login with Google')
          Meteor.loginWithGoogle()
,
      'click #btnLoginFacebook' : (e,t) ->
          e.preventDefault()
          Meteor.loginWithFacebook()
,
      'click #btnLoginPassword' : (e, t) ->
          e.preventDefault()
          Meteor.loginWithPassword()
)

Template.chores.helpers(
  tasks: ->
      return Tasks.find()
)

$( ".column" ).sortable(
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    start: (event, ui) ->
        ui.item.addClass('tilt');
        tilt_direction(ui.item);
    ,
    stop: (event, ui) ->
        ui.item.removeClass("tilt")
        $("html").unbind('mousemove', ui.item.data("move_handler"))
        ui.item.removeData("move_handler")
)


$( ".portlet" )
  .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
  .find( ".portlet-header" )
  .addClass( "ui-widget-header ui-corner-all" )
  .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>")