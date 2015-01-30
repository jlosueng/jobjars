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
    },

    'dones': function() {
    }
});

Template.myChores.events ({

    'dragstart .chore': function(e) {
        e.dataTransfer = e.originalEvent.dataTransfer;
        e.dataTransfer.setData('text', e.target.id);
    },
    'dragover #available-chores,#jar,#mine': function(e) {
        e.preventDefault();
    },
    'drop #available-chores,#jar,#mine': function(e) {
        e.dataTransfer = e.originalEvent.dataTransfer;
        var id = e.dataTransfer.getData('text');
        var elementID = document.getElementById(id);
        var targetID;
        if (['jar', 'mine', 'available-chores'].indexOf(e.target.id) >= 0)
        {
            e.target.appendChild(elementID);
            targetID = e.target.id;
        }
        else {
            e.target.parentNode.appendChild(elementID);
            targetID = e.target.parentNode.id;
        }

        switch (targetID) {
            case 'mine':
                break;
            case 'jar' :
                break;
            case 'available-chores' :
                break;
            default :
                alert('Invalid choice. You shouldn\'t reach this');
        }

        e.preventDefault();
    }
});

Template.myChores.rendered = function() {

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


