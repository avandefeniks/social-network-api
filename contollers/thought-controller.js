const { Thought, User } = require('../models');

// thoughts section of controller
const thoughtController = {

    // Thoughts part of the controller
    getAllThoughts(req, res) {
        Thought.find({})
        .sort({ _id: -1 })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    },

    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            );
        })
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughts); 
        })
        .catch(err => res.status(400).json(err));
    },

    // reactions part of the controller
    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err))
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId}}},
            { new: true, runValidators: true })
        .then(dbThoughts => {
            if (!dbThoughts) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return
        }
        res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughtController;