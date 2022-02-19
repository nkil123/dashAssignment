const express = require ('express');
const router = express.Router ();
const Student = require ('../models/student.model');
// const authorize = require ('../middleware/authorize');
const Test = require ('../models/test.model');
function generateRandomDate () {
  return new Date (+new Date () - Math.floor (Math.random () * 10000000000));
}

router.get ('/alltests', async (req, res) => {
  try {
    const tests = await Test.find ().lean ().exec ();
    console.log (tests);
    return res.status (201).json ({tests});
  } catch (e) {
    return res.status (500).json ({err: e.message, status: 'Failed'});
  }
});

// router.get ('/getsubtest', (req, res) => {
//   // if testedBy in following
//   test.find ({testedBy: {$in: req.user.following}})
//     .populate ('testedBy', '_id name')
//     .populate ('comments.testedBy', '_id name')
//     .sort ('-createdAt')
//     .then (tests => {
//       res.json ({tests});
//     })
//     .catch (err => {
//       console.log (err);
//     });
// });

router.post ('/testData', async (req, res) => {
  try {
    const {name, subject, marks, studentID} = req.body;
    if (!name || !subject || !marks || !studentID) {
      return res.status (422).json ({error: 'Plase add all the fields'});
    }

    let date = new generateRandomDate ().toLocaleDateString ('en-US');
    console.log (date, 'date');
    // let id = datas.length + 1;
    // console.log ('id', id);
    const test = await Test.create ({
      name,
      subject,
      marks,
      studentID,
      date,
    });
    let testArray = await Student.findById (studentID);
    console.log (testArray);
    // let updated = testArray.testID.push (test);
    let f = [...testArray.testID, test];
    console.log (f, 'upsaf');
    let student = await Student.findByIdAndUpdate (
      studentID,
      {testID: f},
      {new: true}
    );
    console.log (student, 'aget');
    return res.status (201).json ({test: test});
  } catch (e) {
    return res.status (500).json ({err: e.message, status: 'Failed'});
  }
});

module.exports = router;
