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

router.post("/", asyncHandler(async (req, res) => {
    const event = await Event.create(res.body);
    res.json(event);
    res.redirect('/')
  })
);

module.exports = router;
