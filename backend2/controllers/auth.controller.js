const express = require ('express');
require ('dotenv').config ();
const router = express.Router ();
const bcrypt = require ('bcryptjs');
const Teacher = require ('../models/teacher.model');
// const authroise = require ('../middleware/authorize');
const jwt = require ('jsonwebtoken');

const token = payload => {
  return jwt.sign (payload, process.env.ACCESS_TOKEN);
};

router.get ('/', async (req, res) => {
  //   console.log ('teacher', req)
  //   console.log (res.teacher);
  const teacher = req.teacher;
  console.log (teacher, 'teacher');
  return res.status (201).json (teacher);
});

router.post ('/signup', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    console.log (name, email, password);
    if (!name || !email || !password) {
      return res.status (401).json ({error: 'please fill all the details'});
    }

    let teacher = await Teacher.findOne ({email: email});
    if (teacher) {
      return res.status (401).json ({error: 'teacher already exist'});
    }
    console.log ('step2');
    teacher = await Teacher.create ({
      email: email,
      password: password,
      name: name,
    });
    console.log (teacher, 'teacher');
    return res.status (201).json ({teacher: teacher});
  } catch (e) {
    return res.status (500).json ({error: e.message, status: 'Failed'});
  }
});

router.post ('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const teacher = await Teacher.findOne ({email: email});

    if (!teacher) return res.status (401).json ({msg: 'invalid credentials'});

    const isMatch = await bcrypt.compare (password, teacher.password);

    if (!isMatch) return res.status (402).json ({msg: 'invalid credentials'});

    const tokenn = token ({id: teacher._id});
    console.log (tokenn, 'token');
    return res.status (201).json ({
      token: tokenn,
      teacher: teacher,
      message: 'login sucessfull',
    });
  } catch (e) {
    return res.status (500).json ({error: e.message, status: 'Failed'});
  }
});

module.exports = router;
