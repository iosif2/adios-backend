var express = require('express');
var router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const checkAdmin = require('../middlewares/check-admin');
const checkBlack = require('../middlewares/check-blacklist');
const { User } = require('../database/models')

router.get('/', checkBlack, checkAuth, checkAdmin, async (req, res, next) => {
  const users = await User.findAll();
  const result = [];
  for (const user of users) {
    result.push({
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
      idAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }
  res.send(result)
});

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  res.send({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })
});

router.post('/', async (req, res, next) => {
  const { name, email, googleId, isAdmin } = req.body;
  const user = await User.create({
    name,
    email,
    googleId,
  });
  res.send({
    name: user.name,
    email: user.email,
    googleId: user.googleId,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })
});

router.put('/:id', checkBlack, checkAuth, checkAdmin, async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  const { name, email, googleId, isAdmin } = req.body;
  await user.update({
    name,
    email,
    googleId,
    isAdmin,
  });
  res.send({
    name: user.name,
    email: user.email,
    googleId: user.googleId,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })
});

router.delete('/:id', checkBlack, checkAuth, checkAdmin, async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.send({
    message: 'User deleted'
  })
});

module.exports = router;
