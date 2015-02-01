/**
 * Created by joe on 6/5/2014.
 */




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
        /*
        var container = $('#newChild');
        container.hide();
        */
        $('#newChild').hide();

    }
});

Template.login.events({
    'click #btnLoginGoogle' : function(e, t) {
        e.preventDefault();
        alert('login with Google');
        Meteor.loginWithGoogle();
    },
    'click #btnLoginFacebook' : function(e,t) {
        e.preventDefault();
        Meteor.loginWithFacebook();
    },
    'click #btnLoginPassword' : function(e,t) {
        e.preventDefault();
        Meteor.loginWithPassword();

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

Template.addTask.events({
    'submit': function() {
        alert($('#taskDesc').val());
    }
});

Template.addChild.events({
});


$( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
    .addClass( "ui-widget-header ui-corner-all" )
    .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");


