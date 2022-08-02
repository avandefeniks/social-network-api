const router = require('express').Router();

const {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../contollers/user-controller');

// for /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// for /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// Set up PUT new friend and DELETE friend /api/users/:userId/friends/:friendId
router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);


module.exports = router;