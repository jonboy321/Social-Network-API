const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    obliterateUser,
    addFriend,
    obliterateFriend
} = require('../../controllers/userController');

// GETS ALL USERS || CREATES NEW USERS
router.route('/').get(getAllUsers).post(createUser);
// GETS USER BY ID || UPDATES USER || DELETES USER
router.route('/:userId').get(getUserById).put(updateUser).delete(obliterateUser);
// ADDS FRIEND || DELETES FRIEND
router.route('/:userId/friends/:friendId').post(addFriend).delete(obliterateFriend);

module.exports = router;