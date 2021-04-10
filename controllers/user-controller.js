const {User, Thought} = require('../models');

const userController = {
    // get all users:
    getAllUser(req, res){
        User.find({})
        // .populate({path: 'friends', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    // get a user by id and populate with friends and thoughts data
    getUserById({params}, res){
        User.findOne({_id: params.id})
        .populate({path: 'friends', select: '-__v'})
        .populate({path: 'thoughts', select: '-__v'})
        .then(dbUserData => res.json(dbUserData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    // create new user:
    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //update a user:
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No User found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete a user and associated Thought Data
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message: 'No User found with this id'});
                return;
            }
            console.log(dbUserData, dbUserData.username)
            return Thought.deleteMany({username: dbUserData.username});
        })
        .then(returnedData =>{
            res.json(returnedData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a friend:
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message: 'No User found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>res.json(err));
    },
    
    //Delete a friend:
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message: 'No User found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>res.json(err));
    }
}
module.exports = userController;