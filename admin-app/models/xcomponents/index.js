var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	uuid: String,
	name: String,
	status: String,
	category: String,
	package: String,
	is_active: Schema.Types.Boolean
});

module.exports = mongoose.model('xcomponents', schema);