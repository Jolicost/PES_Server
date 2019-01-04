const {
    getObjectId
} = require('../../index');

const bcrypt = require('bcryptjs');
var passwordHash = require('password-hash');
var _ = require("underscore");
var maxUsers = 1000;

function hashPassword(password) {
    return passwordHash.generate(password);
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const users = [
    {
        _id: getObjectId('E.SuperAdmin.1'),
        username: 'admin',
        password: hashPassword('admin'),
        userType: 'admin',
    },
    {
    	_id: getObjectId('E.UserEntity.1'),
    	username: "fib",
    	password: hashPassword('fib'),
    	userType: 'entity',
    	entity: getObjectId("E.Entity.1")
    },
    {
    	_id: getObjectId('E.UserEntity.2'),
    	username: "nexus",
    	password: hashPassword('nexus'),
    	userType: 'entity',
    	entity: getObjectId("E.Entity.2")
    }
];
var achievements = require('../2-achievements/achievements');

function getRandomName() {
	let r = Math.random().toString(36).substring(7);
	return r;
}

function getAchievementsSample(index) {
	let n = achievements.length;
	return _.sample(achievements,_.random(0,n)).map(ach => {return ach._id});
}

function getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

function createRandomUsers() {
	let ret = [];
	for (var i = 0; i < maxUsers; i++) {
		let u = {
			_id: getObjectId('E.RandomUser.' + i),
			username: getRandomName(),
			password: hashPassword('random'),
			achievements: getAchievementsSample(i),
			birthday: getRandomDate(new Date('1930-01-01'),new Date('2005-01-01')),
			createdAt: getRandomDate(new Date('2018-01-01'), new Date('2018-12-31')),
			lastRequest: getRandomDate(new Date('2018-12-01'),new Date('2018-12-31')),
			nRequests: _.random(0,5000),
			userType: 'normal',
			entity: getObjectId("E.Entity.1")
		};

		ret.push(u);
	}
	return ret;
}


/* Return random users */
module.exports = users.concat(createRandomUsers());