var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ghatudb:hack123sole$@ds237855.mlab.com:37855/mytasklist', ['tasks'])

//Get all tasks
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err.json())
        }
        res.json(tasks);
    });
});

//Get single tasks
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err.json())
        }
        res.json(task);
    });
});

//save tasks
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err.json())
            }
            res.json(tasks);
        })
    }
});

//Delete 
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err.json())
        }
        res.json(task);
    });
});

//Update Task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone;
    }

    if (task.title) {
        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, function (err, task) {
            if (err) {
                res.send(err.json())
            }
            res.json(task);
        });
    }
});

module.exports = router;