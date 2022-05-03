const express = require("express");
const asyncHandler = require("express-async-handler");

const { User, Group, Event } = require("../../db/models");

const router = express.Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const events = await Event.findAll({
      include: User
    });
    console.log(events);
    return res.json(events);
  })
);

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const event = await Event.create(req.body);
    res.json(event);
  })
);

module.exports = router;
