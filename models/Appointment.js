const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
   _client: {
       type: Schema.Types.ObjectId,
       ref: "User",
       require: true
   },
   _doctor: {
       type: Schema.Types.ObjectId,
       ref: "User"
   },
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
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);