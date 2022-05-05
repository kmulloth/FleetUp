const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");

const { User, Group, Event, RSVP } = require("../../db/models");

const router = express.Router();

router.get('/all', asyncHandler(async (req, res) => {
    const rsvps = await RSVP.findAll({
        include: [User, Event]
        });

    return res.json(rsvps);
    })
);

router.post('/new', requireAuth, asyncHandler(async (req, res) => {
    const { user_id, event_id } = req.body;

    console.log('!!!!', req.body, user_id, event_id);
    const rsvp = await RSVP.create({
        userId: user_id,
        eventId: event_id,
        });

    return res.json({rsvp});
    }));

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const rsvp = await RSVP.findOne({
        where: {
            id: req.params.id
        }
    });

    await rsvp.destroy();
    return res.json({ rsvp });
    }));




module.exports = router;
