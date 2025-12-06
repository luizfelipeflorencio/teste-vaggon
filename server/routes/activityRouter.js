const { Router } = require('express')
const router = Router();
const activityController = require('../controllers/activityController');

router.post('/activity/:userId', activityController.createActivities);
router.get('/activity/:userId', activityController.getActivites)
router.put('/activity/:id', activityController.updateActivities)
router.delete('/activity/:id', activityController.deleteActivities)

module.exports = router;