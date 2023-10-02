const { Router } = require('express');
const { protect } = require('../controllers/authController');
const { createRole, getAllRoles } = require('../controllers/roleController');

const router = Router();
router.use(protect);
router.route('/').get(getAllRoles).post(createRole);

module.exports = router;
