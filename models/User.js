const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now,
        required: true
    },
});

UserSchema.index({email:1});

module.exports=User=mongoose.model('user', UserSchema);