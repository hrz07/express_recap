
const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
} = require('../controllers/user.controller');



router.get('/', getAllUsers);
router.get('/user/:id', getUserById);
router.route('/user')
    .post(addUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;