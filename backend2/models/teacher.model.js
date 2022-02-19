const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const teacherSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
});
teacherSchema.pre ('save', function (next) {
  console.log (this.password);
  if (!this.isModified ('password')) return next ();
  const hash = bcrypt.hashSync (this.password, 8);

  this.password = hash;
  next ();
});
module.exports = mongoose.model ('teacher', teacherSchema);
