
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require('mongoose');
mongoose.connect(MONGO_URI)
.then(() => console.log("Connect to the DB by the mongoose"))
.catch((err) => console.error(err));
