const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordsSchema = new Schema ({
    gendre: {
        type: String,
        enum: ['female', 'male'],
    },
    birthday:{
        type: Date
    },
    consulta:{
        type: ObjectId
    }
});

module.exports = mongoose.model("Records", userSchema);