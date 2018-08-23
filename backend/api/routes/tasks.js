const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/node-rest-api', ['tasks'])

router.get('/', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err.json())
        }
        res.json(tasks);
    });
});

router.post('/', function (req, res, next) {
    db.tasks.save(req.body, (err, task) => {
        if (err) {
            res.send(err.json())
        }
        res.send(task);
    })
});

//Delete 
router.delete('/:id', function (req, res, next) {
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