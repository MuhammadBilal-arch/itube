const { default: Password } = require("antd/lib/input/Password");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name:{
        type:String,
        required: true
    },
    Password:{
        type:String,
        required: true
    },
    PhoneNo:{
        type:Number,
        required: true
    }

});

module.exports = User = mongoose.model('User',UserSchema)