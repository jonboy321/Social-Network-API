const { User, Thoughts } = require('../models');

const thoughtController = {

    // GET ALL THOUGHTS
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // GET THOUGHT BY ID
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thoughts found with this id...' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // CREATE NEW THOUGHT
    createThought({ params, body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate({ _id: params.id}, { $push: { thoughts: _id } }, { new: true });
        })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user exists with this id!' })
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    // UPDATE THOUGHT BY ID
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought exists with this id...' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    
    // DELETE THOUGHT BY ID
    obliterateThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought exists with this id...' });
                return;
            }
            return User.findOneAndUpdate({ _id: params.id }, { $pull: { thoughts: params.id } }, { new: true });
        })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user exists with this id!' });
                return;
            }
            res.json(userData);
        })
        .then(() => {
            res.json({ message: 'MISSION SUCCESS: thought forgotten' });
        })
        .catch(err => res.status(400).json(err));
    },

    // ADDS NEW REACTION
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, { $addToSet: { reactions: body } }, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought exists with this id...' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE REACTION
    obliterateReaction({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id}, { $pull: { reactions: { _id: params.id } } }, { runValidators: true, new: true })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user exists with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;