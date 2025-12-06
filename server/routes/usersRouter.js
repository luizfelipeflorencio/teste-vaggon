const { Router } = require('express')
const router = Router();
const usersController = require('../controllers/usersController');

router.post('/login', usersController.acessUser);
router.post('/users', usersController.createUser);
router.get('/users', usersController.listUsers);
router.get('/users/:id', usersController.getUser);

module.exports = router;