/**
 * Created by joe on 6/5/2014.
 */

Meteor.subscribe('tasks');

Template.chores.events({
    'click #addTask' : function(event) {
        $('#newTask').toggle();
    },
    'click .portlet-toggle' : function(event) {
        var icon = $( this );
        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
        icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    }
});

Template.chores.rendered = function() {
    $('#newTask').hide();
};

Template.choresDone.helpers({
    'choresDone': function() {
        return Tasks.find({'status': 'Done'});
    }
});


Template.children.events({
    'click #addChild' : function(event) {
        $('#newChild').toggle();
    }
});

Template.children.rendered = function() {
    $('#newChild').hide();
};

Template.addChild.events({
    'click #btnAddChild' : function(e, t) {
        e.preventDefault();
        var name = t.find('#childName').value,
            dob = t.find('#childDob').value;
        var userId = Meteor.userId();
        var found = false ? People : true;
    }
});

Template.login.events({
    'click #btnLoginGoogle' : function(e, t) {
        e.preventDefault();
        Meteor.loginWithGoogle();
    }
});

Template.chores.helpers({
    tasks: function() {
        return Tasks.find();
    }
});

$( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    start: function (event, ui) {
        ui.item.addClass('tilt');
        tilt_direction(ui.item);
    },
    stop: function (event, ui) {
        ui.item.removeClass("tilt");
        $("html").unbind('mousemove', ui.item.data("move_handler"));
        ui.item.removeData("move_handler");
    }
});

$( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
    .addClass( "ui-widget-header ui-corner-all" )
    .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");


