/**
 * Created by joe on 6/5/2014.
 */

/*
Tasks = {createdBy, _id, task: short desc, desc: long description, frequency: [Daily, Weekly, Monthly], value: float, minAge: int, available: boolean, lastComplete: date, history[list of dates], lastCompletedBy: userID, nextAvailDate: date}
People = {_id, userId, myTasks; [list of taskIDs], completedTasks[list of taskIDs], rewardsOwed: value, rewardsPaidToDate: value;
Profile = {_id, createdBy: parentuserid, rewardType: [cash, points}
Users = {_id, name: [First, Last], createdAt, emails, dob, role: [child: child_of, parent: parent_of],
 */
//noinspection JSHint
Tasks = new Meteor.Collection("tasks");
//noinspection JSHint
People = new Meteor.Collection("people");
//noinspection JSHint
Profile = new Meteor.Collection("profile");
/*
Meteor.publish('myTasks', function publishFunction(userID) {
    var tasksMine = People.find({userId: userID}, {fields: {_id: 0, myTasks: 1}});
    console.log(tasksMine);
    return tasksMine;
});
*/
ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "940377676441-pg790qcleniuo76e1bo5tqa70pnsokot.apps.googleusercontent.com",
    secret: "8QXwCcANEgXeP4R3AnKR661-"
});

if (Tasks.find().count() === 0) {
    Tasks.insert({
        task_id: 'task_1',
        createdBy: 'bQTHrMmocRyQGek5J',
        task: 'Sweep kitchen',
        desc: 'Sweep the wood floor from the pantry to the kitchen table',
        frequency: 'Daily',
        value: '5',
        minAge: '9',
        available: true,
        lastCompletionDate: '',
        history: [],
        lastCompletedBy: '',
        nextAvailDate: ''
    });
    Tasks.insert({
        task_id: 'task_2',
        createdBy: 'KrNmvnLCbgBtrzjSs',
        task: 'Pick up your bedroom',
        desc: 'Dirty clothes in the hamper, items off the floor, clean off your dresser',
        frequency: 'Daily',
        value: '5',
        minAge: '5',
        available: false,
        lastCompletionDate: '',
        history: [],
        lastCompletedBy: 'jlofshult@gmail.com',
        nextAvailDate: ''
    });
    Tasks.insert({
        task_id: 'task_3',
        createdBy: 'bQTHrMmocRyQGek5J',
        task: 'Change your sheets',
        desc: 'Strip the sheets off your bed and put in hamper. Put clean sheets on the bed',
        frequency: 'Weekly',
        value: '5',
        minAge: '10',
        available: true,
        lastCompletionDate: '',
        history: [],
        lastCompletedBy: 'jlofshult@gmail.com',
        nextAvailDate: ''
    });

};

if (People.find().count() == 0) {
    People.insert({
        userId: 'klofshult',
        name: 'Kelsey Lofshult',
        dob: '11/29/1995',
        role: 'child',
        parent_of: [],
        child_of: ['jlofshult@gmail.com'],
        myTasks: [],
        completedTasks: [],
        rewardsEarned: 0,
        rewardsOwed: 0,
        rewardsEarnedToDate: 0,
        rewardsPaidToDate: 0
    });
    People.insert({
        userId: 'KrNmvnLCbgBtrzjSs',
        name: 'Joe Lofshult',
        dob: '05/19/1964',
        role: 'parent',
        parent_of: ['klofshult'],
        child_of: [],
        myTasks: ['task_2'],
        completedTasks: [],
        rewardsEarned: 0,
        rewardsOwed: 0,
        rewardsEarnedToDate: 0,
        rewardsPaidToDate: 0
    });
};

