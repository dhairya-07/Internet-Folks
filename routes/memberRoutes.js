const { Router } = require('express');
const { protect, restricTo } = require('../controllers/authController');
const {
  createMember,
  removeMember,
} = require('../controllers/memberController');

const router = Router();

router.use(protect);

router.route('/').post(restricTo('Community Admin'), createMember);

router
  .route('/:id')
  .delete(restricTo('Community Admin', 'Community Moderator'), removeMember);

module.exports = router;
