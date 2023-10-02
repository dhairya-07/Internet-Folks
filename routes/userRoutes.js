const { Router } = require('express');
const { getAllUsers, getUser } = require('../controllers/userController');
const {
  signup,
  signin,
  protect,
  getMe,
} = require('../controllers/authController');

const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/me').get(protect, getMe);

router.route('/').get(getAllUsers);
// .delete(async (req, res) => {
//   await User.truncate();
//   return res.status(202).json({ msg: 'Success' });
// });

router.route('/:id').get(getUser);

module.exports = router;
