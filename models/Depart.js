var mongoose = require('mongoose')

    , Schema = mongoose.Schema

var departSchema = Schema({
  dpName: String,
	post_id:[{ type: Schema.Types.ObjectId, ref: 'Post' }]
});


module.exports = mongoose.model('Depart', departSchema);