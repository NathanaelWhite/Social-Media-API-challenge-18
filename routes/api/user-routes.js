const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteFriend,
    deleteUser
} = require('../../controllers/user-controllers');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);
    
module.exports = router;