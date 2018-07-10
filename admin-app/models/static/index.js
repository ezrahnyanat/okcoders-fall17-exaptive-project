var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	title: String,
	description: String,
	date_modified: Date
});

module.exports = mongoose.model('static', schema);