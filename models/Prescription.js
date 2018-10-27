const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
   _appointment: {
       type: Schema.Types.ObjectId,
       ref: "Appointment",
       require: true
   },
    prescription: {
        type: String,
        require: true
   },
    notes: {
        type: String
   }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);