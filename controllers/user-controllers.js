const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ __id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a single user by _id and populated thought/friend data
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v"
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create a user
  createUser({ body }, res) {
      User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
  },
  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: 'no friend with this id' })
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },
  // update a user
  updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
  },
  // delete a user
  deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
  },
  // delete a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: 'no friend with this id' })
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },
};

module.exports = userController;
