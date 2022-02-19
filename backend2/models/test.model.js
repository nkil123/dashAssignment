const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const testSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  subject: {type: String, required: true},
  marks: {type: Number, required: true},
  date: {type: Date, required: true},
  studentID: {type: ObjectId, ref: 'test', required: true},
});

module.exports = mongoose.model ('test', testSchema);
