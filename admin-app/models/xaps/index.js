var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	uuid: String,
	is_active: Schema.Types.Boolean,
});

module.exports = mongoose.model('xaps', schema);