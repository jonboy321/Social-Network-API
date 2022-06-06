const { User, Thoughts } = require('../models');

const userController = {

    // GET ALL USERS
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // GET USER BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No such user exists with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // CREATE USER
    createUser({body}, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    // UPDATE USER BY ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'Could not update user because no user exists with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE USER BY ID
    obliterateUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'Could not delete user because no user exists with this id!' });
                return;
            }
        })
        .then(() => {
            res.json({ message: 'MISSION SUCCESS: User deleted!' });
        })
        .catch(err => res.status(400).json(err));
    },

    // ADD FRIEND TO USER'S FRIEND LIST
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No such user exists with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    // REMOVE FRIEND FROM USER'S FRIEND LIST
    obliterateFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, {new: true}, { runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No such user exists with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;