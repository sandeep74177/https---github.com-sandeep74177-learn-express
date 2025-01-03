const express = require("express");
const fs = require("fs");
const router = express.Router();
const Student = require("../models/student");
const Profile = require("../models/profile");
const Club= require("../models/club");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate('profile.nsted.field grades');
    res.json(students);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to fetch students from the database." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('profile');
    if (!student) {
      res.status(404).json({ message: "Student not found." });
      return;
    }
    res.json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to fetch the student from the database." });
  }
});

//route for profile
router.post("/:id/profile",async (req,res)=>{
  try{
    const newProfile= new Profile(req.body);
    const profile=await newProfile.save();

    const student=await Student.findById(req.params.id);
    student.profile=profile._id;
    const ack =await student.save();
    res.json({
    
      profile: profile,
      ack
  });
} catch(err){
    res.status(500).json({ message: err.message});
  }
});


// club route
router.post("/:id/club",async (req,res)=>{
  try{
    const newClub= new Club(req.body);
    const club=await newClub.save();

    const student=await Student.findById(req.params.id);
    student.club=club._id;
    const ack =await student.save();
    res.json({
 student: ack,
      club: club,
    
      
      
  });
} catch(err){
    res.status(500).json({ message: err.message});
  }
});

//route for grades section
router.patch("/:id/grades", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    student.grades.push(req.body);
    const ack = await student.save();
    res.json({student:ack});
  } catch {(err) => {
      res.status(500).json({ message: err.message });
    };
  }
});

router.post("/", async (req, res) => {
  try {
    const newstudent = new Student(req.body);
    const student = await newstudent.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    Object.assign(student, req.body);
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found." });
      return;
    }
    res.json({ message: "Student successfully deleted.", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
