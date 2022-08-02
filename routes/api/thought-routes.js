const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction    
}= require('../../contollers/thought-controller');

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
// .delete(deleteThought)
.post(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);
// .delete(deleteReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;