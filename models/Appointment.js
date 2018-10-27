const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;
//no puseel passport, no siento que sea necesario en este modelo

const appointmentSchema = new Schema({
   client_id: {
       type: ObjectId,
       require: true
   },
   doctor_id: {
       type: ObjectId,
       require: true
   } ,
    date: {
       type: Date,
       require: true
    },
    description:{
       type: String
    },
    cost: {
       type: Number
    }
});

module.exports = mongoose.model("Appointment", userSchema);
