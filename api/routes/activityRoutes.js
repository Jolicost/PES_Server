'use strict';
module.exports = function(app) {
    var activity = require('../controllers/activityController');
    var restful = require('node-restful');
    var Activities = app.activities = restful.model('Activities',null)
        .methods(['get', 'post', 'put', 'delete']);

    Activities.register(app,'/activities');
    
    /*
    // activity Routes
    app.route('/activities')
        .get(activity.list)
        .post(activity.create)
        .delete(activity.deleteAll);

    app.route('/activities/:activityId')
        .get(activity.read)
        .put(activity.update)
        .delete(activity.delete);

    app.route('/activitiesList')
        .get(activity.shortList);
    */
}
