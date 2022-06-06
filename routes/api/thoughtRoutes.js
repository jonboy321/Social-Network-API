const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThought,
    obliterateThought,
    addReaction,
    obliterateReaction
} = require('../../controllers/thoughtController');

// GETS ALL THOUGHTS || CREATES NEW THOUGHTS
router.route('/').get(getAllThoughts).post(createThought);
// GETS THOUGHTS BY ID || UPDATES A THOUGHT || DELETES A THOUGHT
router.route('/:thoughtId').get(getThoughtsById).put(updateThought).delete(obliterateThought);
// ADDS A REACTION || DELETES A REACTION
router.route('/:thoughtId/reactions/:reactionId').post(addReaction).delete(obliterateReaction);

module.exports = router;