const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const studentSchema = new mongoose.Schema ({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  grade: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  testID: [{type: ObjectId, ref: 'test'}],
});

module.exports = mongoose.model ('student', studentSchema);
