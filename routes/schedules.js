var express = require('express');
var router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const checkAdmin = require('../middlewares/check-admin');
const checkBlack = require('../middlewares/check-blacklist');
const { Schedule } = require('../database/models')


router.get('/', checkBlack, checkAuth, async (req, res, next) => {
    const schedules = await Schedule.findAll();
    const result = [];
    for (const schedule of schedules) {
        result.push({
            id: schedule.id,
            title: schedule.title,
            description: schedule.description,
            datetime: schedule.datetime,
            duration: schedule.duration,
            isCancelled: uscheduleser.isCancelled,
            createdAt: schedule.createdAt,
            updatedAt: schedule.updatedAt,
        })
    }
    res.send(result)
});

router.get('/:id', checkBlack, checkAuth, async (req, res, next) => {
    const schedule = await Schedule.findByPk(req.params.id);
    res.send({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        datetime: schedule.datetime,
        duration: schedule.duration,
        isCancelled: schedule.isCancelled,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
    })
});

router.post('/', checkBlack, checkAuth, async (req, res, next) => {
    const { title, description, datetime, duration } = req.body;
    const schedule = await Schedule.create({
        title,
        description,
        datetime,
        duration,
    });
    res.send({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        datetime: schedule.datetime,
        duration: schedule.duration,
        isCancelled: schedule.isCancelled,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
    })
});

router.put('/:id', checkBlack, checkAuth, async (req, res, next) => {
    const schedule = await Schedule.findByPk(req.params.id);
    const { title, description, datetime, duration } = req.body;
    await schedule.update({
        title,
        description,
        datetime,
        duration,
    });
    res.send({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        datetime: schedule.datetime,
        duration: schedule.duration,
        isCancelled: schedule.isCancelled,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
    })
});

router.delete('/:id', checkBlack, checkAuth, async (req, res, next) => {
    const schedule = await Schedule.findByPk(req.params.id);
    await schedule.destroy();
    res.send({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        datetime: schedule.datetime,
        duration: schedule.duration,
        isCancelled: schedule.isCancelled,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
    })
});

module.exports = router;
