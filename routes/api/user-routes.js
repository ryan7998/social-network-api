const router = require('express').Router();
const {getAllUser, createUser, getUserById, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/user-controller');

// /api/user:
router.route('/')
    .get(getAllUser)
    .post(createUser);

    // /api/user/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;