var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  empName: String,
  empActive: Boolean,
  dep: String,
  emp_dpID: []
});

module.exports = mongoose.model('Post', PostSchema);