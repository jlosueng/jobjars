/**
 * Created by joe on 6/5/2014.
 */

Meteor.subscribe('tasks');
Meteor.subscribe('people');

Meteor.startup(function() {

});

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

Template.myChores.helpers({
    'tasks': function() {
        return Tasks.find();
    },

    'mines': function() {
        return Tasks.find();
    },

    'dones': function() {
        return Tasks.find();
    }
});

Template.myChores.events ({
/*
    'dragstart .chore': function(e) {
        e.dataTransfer = e.originalEvent.dataTransfer;
        e.dataTransfer.setData('text', this._id);
    },
    'dragover .jar': function(e) {
        e.preventDefault();
    },
*/
    'drop .jar': function(e) {

        e.preventDefault();
        e.dataTransfer = e.originalEvent.dataTransfer;
        var id = e.dataTransfer.getData('text');
        e.target.appendChild(document.getElementById(id));
    }
});

Template.myChores.rendered = function() {
    $('body').on('dragstop', '.chore', function(e) {
        alert('Dropped chore');
    });

};

Template.children.events({
    'click #addChild' : function(event) {
        $('#newChild').toggle();
    }
});

Template.children.helpers({
    'child': function() {
        return People.find();
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
        People.insert({'userID': userId, 'name': name, 'dob':dob});
        var container = $('#newChild');
        container.hide();
    },
    'click .closeBox' : function(e) {
        e.preventDefault();
        var container = $('#newChild');
        container.hide();

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

Template.rewardsEarned.rendered = function() {
};

Template.rewardsEarned.events({
    'click .btn': function(e, t){
        e.preventDefault();
        alert('Reward button clicked');
    }
});

$( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
    .addClass( "ui-widget-header ui-corner-all" )
    .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");


