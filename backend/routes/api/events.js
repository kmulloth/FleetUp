const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");

const { User, Group, Event } = require("../../db/models");

const router = express.Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const events = await Event.findAll({
      include: User
    });
    // console.log(events);
    return res.json(events);
  })
);

router.get('/:id', asyncHandler(async (req, res) => {
  const event = await Event.findOne({
    where: {
      id: req.params.id
    },
    include: [User, Group]
  });
  return res.json(event);
}))

router.post("/new", requireAuth, asyncHandler(async (req, res) => {
  const { user_id, imgUrl, name, date, time, body, capacity, attending } = req.body;

  const event = await Event.create({
    user_id,
    imgUrl,
    name,
    date,
    time,
    body,
    capacity,
    attending,
  });
  // console.log(event);
  await event.save();
  return res.json({event});
  }));

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { user_id, imgUrl, name, date, time, body, attending } = req.body;
    console.log('IMAGE URL: ', imgUrl)
    const event = await Event.findOne({
      where: {
        id: req.params.id
      },
      include: User
    });
    event.imgUrl = imgUrl;
    event.name = name;
    event.date = date;
    event.time = time;
    event.body = body;
    event.attending = attending;
    await event.save();
    return res.json({ event });
  }))

  router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const event = await Event.findOne({where: {id: req.params.id}});
    await event.destroy();
    return res.json({ event });
  }))

module.exports = router;
