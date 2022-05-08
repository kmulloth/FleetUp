const express = require("express");
const asyncHandler = require("express-async-handler");

const { User, Group, Event } = require("../../db/models");

const router = express.Router();

router.get('/all', asyncHandler(async (req, res) => {
  const events = await Group.findAll({
    include: User
  });
  return res.json(events);
}));

router.post("/new", requireAuth, asyncHandler(async (req, res) => {
  const { user_id, title, description } = req.body;

  const group = await Group.create({
    user_id,
    title,
    description,
  });

  await group.save();
  return res.json({ group });
}));


module.exports = router;
