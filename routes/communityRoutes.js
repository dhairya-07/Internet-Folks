const { Router } = require('express');
const { protect } = require('../controllers/authController');
const {
  createCommunity,
  getMyOwnedCommunities,
  getMembers,
  getAllCommunities,
  getMyJoinedCommunities,
} = require('../controllers/communityController');

const router = Router();

router.use(protect);

router.route('/').get(getAllCommunities).post(createCommunity);

router.route('/:id/members').get(getMembers);

router.route('/me/owner').get(getMyOwnedCommunities);
router.route('/me/member').get(getMyJoinedCommunities);

module.exports = router;
