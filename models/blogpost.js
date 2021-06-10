var mongoose = require('mongoose');

// User Schema
var BlogPostSchema = mongoose.Schema({
	title: {
		type: String,
	},
	Owner: {
		type: String
	},
	Image: {
		type: String
	},
	body: {
		type: String
	},
	likes: {
		type: Number
	},
	timeofpost: {
		type: Number
	}
});

var blogPost = module.exports = mongoose.model('BlogPost', BlogPostSchema);
