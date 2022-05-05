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

module.exports = router;
