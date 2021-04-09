const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate:{
                validator: function(email){
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
        thoughts:{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        },
        friends:{
            type: Schema.Types.ObjectId,
            ref: 'Friends'
        }
    }
);

const User = model('User', UserSchema);
module.exports = User;