/**
 * Created by joe on 6/5/2014.
 */

/*
Tasks = {userId: userid, taskID: _id, task: short desc, desc: long description, frequency: [Daily, Weekly, Monthly], value: float, minAge: int}
People = {userId: userid, name: Full name, dob: date, role: [child, parent], parent_of: [list of children], child_of: [list of parents]
Profile = {rewardType: [cash, points], familyMembers: [list of userId]
Avail
CompletedTasks = {taskID: _id, userId: userid, date: date, value: float}
 */
Tasks = new Meteor.Collection("tasks");
People = new Meteor.Collection("people");
Profile = new Meteor.Collection("profile");
CompletedTasks = new Meteor.Collection("completedTasks");
RewardsOwed = new Meteor.Collection("rewardsOwed");
RewardsPaid = new Meteor.Collection("rewardsPaid");

ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "940377676441-pg790qcleniuo76e1bo5tqa70pnsokot.apps.googleusercontent.com",
    secret: "8QXwCcANEgXeP4R3AnKR661-",
});

if (Tasks.find().count() == 0) {
    Tasks.insert({
        userId: 'jlofshult@gmail.com',
        task: 'Sweep kitchen',
        desc: 'Sweep the wood floor from the pantry to the kitchen table',
        frequency: 'Daily',
        value: '5',
        minAge: '9'
    });
    Tasks.insert({
        userId: 'jlofshult@gmail.com',
        task: 'Pick up your bedroom',
        desc: 'Dirty clothes in the hamper, items off the floor, clean off your dresser',
        frequency: 'Daily',
        value: '5',
        minAge: '5'
    });
    Tasks.insert({
        userId: 'jlofshult@cox.net',
        task: 'Change your sheets',
        desc: 'Strip the sheets off your bed and put in hamper. Put clean sheets on the bed',
        frequency: 'Weekly',
        value: '5',
        minAge: '10'
    });

}
