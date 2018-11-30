'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* 
User Schema
Represents an user in the application
An user can have multiple contributions, post in contributions and do other stuff
*/
var UserSchema = new Schema({
    //_id is implicit
    // Username
    username: {
        type: String,
        default: "",
    },
    // Password. Not crypted (for now)
    password: {
        type: String,
        default: "",
        select: false
    },
    // user email
    email: {
        type: String,
        default: "",
        index: {
            unique: true
        },
        select: false,
        allowed: ['entity,admin']
    },
    // complete user name
    completeName: {
        type: String,
        default: ""
    },
    // User birthday
    birthday: {
        type: Date,
        default: Date.now()
    },
    // user profile pic (URL)
    profilePic: {
        type: String,
        default: "https://i.imgur.com/jNNT4LE.png"
    },
    // user phone
    phone: {
        type: String,
        default: "",
        select: false
    },
    // contact phones (family phones)
    contactPhones: {
        type: Array,
        items: {
            alias: String,
            phone: String
        },
        select: false
    },
    // creation date
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // user type
    userType: {
        type: String,
        enum: [
            'normal',
            'entity',
            'admin'
        ],
        default: "normal"
    },
    // ref to entity, applicable to both normal users and entity users
    entity: {
        type: Schema.Types.ObjectId,
        ref: 'Entities',
        select: false
    },
    // user address calculated using postal code
    place: {
        type: Object,
        properties: {
            placeId: {
                type: String
            },
            placeName: {
                type: String
            }
        },
        select: false
    },
    // auth credentials
    auth: {
        type: Object,
        properties: {
            google: {
                token: String,
                id: String
            },
            facebook: {
                token: String,
                id: String
            }
        },
        select: false
    },
    lastRequest: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

exports.userSchema = UserSchema;

// Make the model visible to other modules across mongoose
module.exports = mongoose.model('Users', UserSchema);
