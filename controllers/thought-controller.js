const {Thought, User} = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },

    //get thoughts by ID
    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },

    //create a thougth and insert it in user's thoughts document:
    createThought({body}, res){
        Thought.create(body)
        .then(returnData => {
            return User.findOneAndUpdate(
                {username: returnData.username},
                {$push: {thoughts: returnData._id}},
                {new: true}
            );
        }).then(dbThoughtData =>{
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //update thought
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=>res.status(400).json(err));
    },

    //Delete thoughts:
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData =>{
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Add new Reaction to Thoughts
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbReactionData =>{
            if(!dbReactionData){
                res.status(404).json({message: 'No Thought found with this id!'});
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err=> res.json(err));
    },
    //Delete Reaction from Thoughts
    deleteReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions:{reactionId: params.reactionId}}},
            {new:true}
        )
        .then(dbPizzaData=> res.json(dbPizzaData))
        .catch(err=> res.json(err));
    }
}
module.exports = thoughtController;