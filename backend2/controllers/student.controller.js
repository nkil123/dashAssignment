const express = require ('express');
const router = express.Router ();

// const authorize = require ('../middleware/authorize');
const Student = require ('../models/student.model');

router.get ('/allStudents', async (req, res) => {
  try {
    console.log ('allstudents');
    console.log (req.query);
    const page = +req.query.page || 1;

    const size = +req.query.size || 5;
    console.log (page, size, 'page size');
    const searchName = req.query.search;
    const sortt = req.query.sort === 'null' ? 1 : req.query.sort;
    const skip = (page - 1) * size;
    const filter = req.query.filter;
    if (sortt !== 'null' && filter !== 'null') {
      const student = await Student.find ({
        gender: filter === 'M' ? 'Male' : 'Female',
      })
        .sort ({age: sortt === 'true' ? 1 : -1})
        .populate ('testID')
        .skip (skip)
        .limit (size)
        .lean ()
        .exec ();

      // console.log (student, 'ans');
      return res.status (201).json ({students: student, totalPages: 1});
    }
    // console.log (searchName, searchName.length);
    if (searchName !== 'null') {
      const student = await Student.find ({name: searchName})
        .populate ('testID')
        .lean ()
        .exec ();
      // console.log (student, 'ans');
      return res.status (201).json ({students: student, totalPages: 1});
    }
    // const skip = (page - 1) * size;
    const students = await Student.find ()
      .populate ('testID')
      .skip (skip)
      .limit (size)
      .lean ()
      .exec ();
    // console.log (students);
    const totalPages = Math.ceil (
      (await Student.find ().countDocuments ()) / size
    );
    return res.status (201).json ({students, totalPages});
  } catch (e) {
    return res.status (500).json ({err: e.message, status: 'Failed'});
  }
});

// router.get ('/getsubstudent', (req, res) => {
//   // if studentedBy in following
//   student.find ({studentedBy: {$in: req.user.following}})
//     .populate ('studentedBy', '_id name')
//     .populate ('comments.studentedBy', '_id name')
//     .sort ('-createdAt')
//     .then (students => {
//       res.json ({students});
//     })
//     .catch (err => {
//       console.log (err);
//     });
// });

router.post ('/studentData', async (req, res) => {
  try {
    console.log ('studentData');
    const datas = await Student.find ();
    const {name, gender, age, grade} = req.body;
    if (!name || !age || !gender || !grade) {
      return res.status (422).json ({error: 'Plase add all the fields'});
    }
    let id = datas.length + 1;
    console.log ('id', id);
    const student = await Student.create ({
      id: id,
      name,
      gender,
      age,
      grade,
      testID: [],
    });
    return res.status (201).json ({student: student});
  } catch (e) {
    return res.status (500).json ({err: e.message, status: 'Failed'});
  }
});

router.get ('/myStudent/*/:id', async (req, res) => {
  try {
    console.log ('mystudent');
    let id = req.params.id;
    const student = await Student.findById (id)
      .populate ('testID')
      .lean ()
      .exec ();
    console.log ('data', student);
    return res.status (201).json ({student: student});
  } catch (e) {
    return res.status (500).json ({err: e.message, status: 'Failed'});
  }
});

module.exports = router;
