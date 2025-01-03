const mongoose = require('mongoose');

const gradeSchema=mongoose.Schema({
    subject:String,
    score:Number,
    maxScore:Number,
    date:{
        type:Date,
        default: Date.now, // default
    },
});



const StudentSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        
    },
    gpa:{
        type:Number,
        default:3,

    },
    age:{
        type:Number,
    },
   
    courses: {
        type: [String],
       default: ["Maths"]
       
    },
   grades:{
    type: [gradeSchema],
    default: [],
   },
   profile:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: 'Profile'
   },
    club:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Club'
    }
  });

module.exports = mongoose.model('Student',StudentSchema);



